import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Line } from "react-chartjs-2";
import { getUser, logoutUser } from "../services/api";
import "./Dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const API_KEY = "CJLOX6T5RDVQGZ26"; // Alpha Vantage API key
const NEWS_API_KEY = "157e269da34d461bbdb68ac9e9f4ba8e"; // <-- Replace with your NewsAPI key

// Loading spinner
const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center p-5">
    <div
      className="spinner-border text-info"
      style={{ width: "3rem", height: "3rem" }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

// Info Card Component
const InfoCard = ({ title, value, change, isPositive, isCurrency = true }) => {
  const changeTextColor =
    isPositive === undefined
      ? "text-body-secondary"
      : isPositive
      ? "text-success"
      : "text-danger";
  const changeSymbol = isPositive === undefined ? "" : isPositive ? "▲" : "▼";
  const formattedValue =
    isCurrency && !isNaN(parseFloat(value))
      ? `₹${parseFloat(value).toLocaleString("en-IN")}`
      : value;

  return (
    <div className={`card info-card bg-dark-subtle border-2 h-100`}>
      <div className="card-body">
        <p className="card-subtitle text-body-secondary mb-1 small">{title}</p>
        <p className="card-title text-dark h5 fw-bold mb-0">{formattedValue}</p>
        {change !== undefined && (
          <p className={`fw-semibold mt-1 mb-0 small ${changeTextColor}`}>
            {changeSymbol} {change}
          </p>
        )}
      </div>
    </div>
  );
};

// Stock Chart Component
const StockChart = ({ chartData, isPositive, stockName }) => {
  const accentColor = isPositive ? "52, 211, 153" : "248, 113, 113";

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(211, 220, 241, 0.9)",
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        borderColor: `rgba(${accentColor}, 0.5)`,
        borderWidth: 1,
      },
      title: {
        display: true,
        text: `${stockName || "Stock"} - Price Chart`,
        color: "#0dcaf0",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6c757d",
          autoSkip: true,
          maxTicksLimit: 7,
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      y: {
        position: "right",
        ticks: {
          color: "#6c757d",
          callback: (val) => `₹${val.toFixed(2)}`,
        },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
    },
  };

  const dummyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dummyPrices = [100, 120, 115, 140, 135, 150, 160];

  const data = {
    labels: chartData.labels.length > 0 ? chartData.labels : dummyLabels,
    datasets: [
      {
        label: "Price",
        data: chartData.data.length > 0 ? chartData.data : dummyPrices,
        borderColor: `rgb(${accentColor})`,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, `rgba(${accentColor},0.5)`);
          gradient.addColorStop(1, `rgba(${accentColor},0)`);
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
        fill: true,
      },
    ],
  };

  return (
    <div className="chart-container bg-dark p-3 p-md-4 rounded">
      <Line options={options} data={data} />
    </div>
  );
};

// Helper: parse numeric values robustly
const parseNumber = (val) => {
  if (val === null || val === undefined) return null;
  const n = parseFloat(String(val).replace(/[^0-9.\-eE]/g, ""));
  return Number.isFinite(n) ? n : null;
};

// Main Dashboard Component
function Dashboard({ setToken }) {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockQuote, setStockQuote] = useState(null);
  const [stockChartData, setStockChartData] = useState({ labels: [], data: [] });
  const [companyDetails, setCompanyDetails] = useState(null);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logoutUser();
    setToken(null);
    window.location.href = "/login";
  };

  // Debounced Search (Alpha Vantage SYMBOL_SEARCH)
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSearchResults([]);
      setError(null);
      return;
    }

    const fetchSearchResults = async (query) => {
      setIsSearching(true);
      setError(null);
      setSearchResults([]);
      try {
        const res = await fetch(
          `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${API_KEY}`
        );
        const data = await res.json();
        if (data.Note) throw new Error("Alpha Vantage API call limit reached.");
        if (data.Information) throw new Error(data.Information);

        const indianStocks = (data.bestMatches || []).filter((s) => s["4. region"] === "India/Bombay");
        if (indianStocks.length === 0) setError({ message: `No Indian stocks found for "${query}".` });
        setSearchResults(indianStocks);
      } catch (err) {
        setError({ message: err.message });
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(() => fetchSearchResults(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch Stock Details (quote, series, overview) and news
  const fetchStockDetails = useCallback(
    async (symbol) => {
      setIsLoading(true);
      setError(null);
      setStockQuote(null);
      setStockChartData({ labels: [], data: [] });
      setCompanyDetails(null);
      setNews([]);
      try {
        const [quoteRes, seriesRes, overviewRes] = await Promise.all([
          fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`),
          fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`),
          fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`)
        ]);

        const [quoteData, seriesData, overviewData] = await Promise.all([quoteRes.json(), seriesRes.json(), overviewRes.json()]);

        if (quoteData.Note || seriesData.Note) throw new Error("Alpha Vantage API call limit reached.");
        if (quoteData["Error Message"] || seriesData["Error Message"]) throw new Error("Invalid stock symbol or API error.");

        setStockQuote(quoteData["Global Quote"]);
        setCompanyDetails(overviewData && Object.keys(overviewData).length ? overviewData : null);

        // Build chart data
        const ts = seriesData["Time Series (Daily)"];
        if (ts) {
          const labels = Object.keys(ts).slice(0, 90).reverse();
          const points = labels.map((d) => parseFloat(ts[d]["4. close"]));
          setStockChartData({ labels, data: points });
        } else {
          setStockChartData({ labels: [], data: [] });
        }

        // Fetch news only if key present
        const companyName = overviewData?.Name || symbol;
        if (NEWS_API_KEY && NEWS_API_KEY !== "YOUR_NEWS_API_KEY_HERE") {
          try {
            const q = encodeURIComponent(`"${companyName}" OR ${symbol}`);
            const newsRes = await fetch(
              `https://newsapi.org/v2/everything?q=${q}&pageSize=6&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`
            );
            const newsJson = await newsRes.json();
            if (newsJson.status === "ok") {
              setNews(newsJson.articles || []);
            } else {
              // don't throw — just log
              console.warn("NewsAPI returned error:", newsJson);
            }
          } catch (newsErr) {
            console.warn("Failed to fetch news:", newsErr.message);
          }
        } else {
          // No API key configured: skip news fetch
          setNews([]);
        }
      } catch (err) {
        setError({ message: err.message });
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleSelectStock = (stock) => {
    setSelectedStock(stock);
    setSearchQuery("");
    setSearchResults([]);
    fetchStockDetails(stock["1. symbol"]);
  };

  const clearSelection = () => {
    setSelectedStock(null);
    setStockQuote(null);
    setStockChartData({ labels: [], data: [] });
    setCompanyDetails(null);
    setNews([]);
    setError(null);
  };

  const quoteDetails = useMemo(() => {
    if (!stockQuote) return null;
    const change = parseNumber(stockQuote["09. change"]) || 0;
    const changePercentNum = parseNumber(String(stockQuote["10. change percent"] || "0").replace("%", "")) || 0;
    return {
      price: stockQuote["05. price"],
      change: change.toFixed(2),
      changePercent: `${changePercentNum.toFixed(2)}%`,
      changePercentNumber: changePercentNum,
      isPositive: change >= 0,
      high: stockQuote["03. high"],
      low: stockQuote["04. low"],
      volume: stockQuote["06. volume"] ? parseInt(stockQuote["06. volume"]).toLocaleString("en-IN") : "N/A",
    };
  }, [stockQuote]);

  // Recommendation logic based on short-term trend (last 7 points)
  const recommendation = useMemo(() => {
    const points = stockChartData.data;
    if (!points || points.length < 2) {
      if (quoteDetails) {
        const cp = quoteDetails.changePercentNumber;
        if (cp > 2) return "Buy";
        if (cp < -2) return "Sell";
        return "Hold";
      }
      return "Hold";
    }
    const lastN = points.slice(-7);
    const first = lastN[0];
    const last = lastN[lastN.length - 1];
    if (!first || !last) return "Hold";
    const pct = ((last - first) / first) * 100;
    if (pct > 2) return "Buy";
    if (pct < -2) return "Sell";
    return "Hold";
  }, [stockChartData, quoteDetails]);

  return (
    <div className="app-container">
      <header className="d-flex justify-content-between align-items-center p-3 bg-dark text-light">
        <h4>{user ? `Welcome, ${user.username}` : "Dashboard"}</h4>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="container py-4 py-md-5">
        {!selectedStock ? (
          <div className="search-view text-center text-white">
            <h1 className="display-5 text-info text-white fw-bold mb-3">Indian Stock Market</h1>
            <p className="lead text-body-secondary mb-4 text-white">Search for a stock to see its performance.</p>

            <div className="search-wrapper mx-auto">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                placeholder="Search by company name or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control form-control-lg search-input"
              />
              {isSearching && (
                <div className="spinner-border spinner-border-sm text-secondary search-spinner" role="status"></div>
              )}
            </div>

            {error && <div className="alert alert-danger mt-4">{error.message}</div>}

            <div className="search-results-container mt-4">
              <div className="list-group">
                {searchResults.map((stock) => (
                  <button
                    key={stock["1. symbol"]}
                    onClick={() => handleSelectStock(stock)}
                    className="list-group-item list-group-item-action bg-dark text-light"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1 text-info">{stock["1. symbol"]}</h5>
                      <small className="text-body-secondary">{stock["8. currency"]}</small>
                    </div>
                    <p className="mb-1 text-truncate">{stock["2. name"]}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <header className="dashboard-header mb-5 d-flex justify-content-between align-items-center">
              <div>
                <h2 className="display-4 text-white fw-bold">{selectedStock["1. symbol"]}</h2>
                <p className="fs-5 text-white">{selectedStock["2. name"]}</p>
              </div>
              <button onClick={clearSelection} className="btn btn-outline-info d-flex align-items-center text-white">
                <i className="bi bi-search me-2 text-white"></i> Search Again
              </button>
            </header>

            {isLoading && <LoadingSpinner />}
            {error && <div className="alert alert-danger mb-4 text-center">{error.message}</div>}

            {quoteDetails && (
              <>
                <div className="row g-3 g-lg-4 mb-4">
                  <div className="col-6 col-md-4 col-lg-auto flex-grow-1">
                    <InfoCard title="Price" value={quoteDetails.price} change={quoteDetails.change} isPositive={quoteDetails.isPositive} />
                  </div>
                  <div className="col-6 col-md-4 col-lg-auto flex-grow-1">
                    <InfoCard title="Change" value={quoteDetails.changePercent} isPositive={quoteDetails.isPositive} isCurrency={false} />
                  </div>
                  <div className="col-6 col-md-4 col-lg-auto flex-grow-1">
                    <InfoCard title="Day's High" value={quoteDetails.high} />
                  </div>
                  <div className="col-6 col-md-4 col-lg-auto flex-grow-1">
                    <InfoCard title="Day's Low" value={quoteDetails.low} />
                  </div>
                  <div className="col-12 col-md-4 col-lg-auto flex-grow-1">
                    <InfoCard title="Volume" value={quoteDetails.volume} isCurrency={false} />
                  </div>
                </div>

                <StockChart chartData={stockChartData} isPositive={quoteDetails.isPositive} stockName={selectedStock["1. symbol"]} />

                <div className="company-details mt-4 p-3 bg-dark text-light rounded">
                  {companyDetails ? (
                    <>
                      <h4>{companyDetails.Name}</h4>
                      <p>{companyDetails.Description}</p>
                      <p>
                        <strong>Sector:</strong> {companyDetails.Sector} | <strong>Industry:</strong> {companyDetails.Industry}
                      </p>
                      <p>
                        <strong>Market Cap:</strong> ₹{parseInt(companyDetails.MarketCapitalization || 0).toLocaleString("en-IN")}
                      </p>
                    </>
                  ) : (
                    <p>No detailed company info available.</p>
                  )}

                  <hr />
                  <h5 className="text-info mt-3">Recommendation</h5>
                  <p>Based on recent performance: <strong>{recommendation}</strong></p>

                  <h5 className="text-info mt-3">Financial Metrics (sample/estimated)</h5>
                  <ul>
                    <li>Net Worth: ₹1,200 Cr</li>
                    <li>Debt: ₹300 Cr</li>
                    <li>Profit/Loss: ₹250 Cr</li>
                  </ul>

                  <h5 className="text-info mt-3">Founder / Executives</h5>
                  <ul>
                    <li>Founder: Ramesh Patel</li>
                    <li>CEO: Priya Mehta</li>
                    <li>CFO: Karan Desai</li>
                  </ul>

                  {/* Company News Section */}
                  <h5 className="text-info mt-4">Latest News</h5>
                  {NEWS_API_KEY && NEWS_API_KEY !== "YOUR_NEWS_API_KEY_HERE" ? (
                    news.length > 0 ? (
                      <ul className="list-unstyled mt-2">
                        {news.map((article, index) => (
                          <li key={index} className="mb-3 border-bottom pb-2">
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-info fw-semibold text-decoration-none">
                              {article.title}
                            </a>
                            <div className="text-secondary small">
                              {article.source?.name} — {new Date(article.publishedAt).toLocaleDateString()}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-body-secondary">No recent news found for this company.</p>
                    )
                  ) : (
                    <p className="text-body-secondary">No NEWS_API_KEY configured — add your NewsAPI key to `NEWS_API_KEY` to enable live news.</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
