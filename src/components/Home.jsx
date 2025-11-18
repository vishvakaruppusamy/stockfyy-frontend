import React from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import "./Home.css";

const Home = () => {
  // Dummy data for charts
  const nifty50Data = [
    { date: "Mon", value: 22500 },
    { date: "Tue", value: 22750 },
    { date: "Wed", value: 22600 },
    { date: "Thu", value: 22900 },
    { date: "Fri", value: 22850 },
  ];

  const topCompanies = [
    "Reliance Industries",
    "Tata Consultancy Services",
    "HDFC Bank",
    "Infosys",
    "ICICI Bank",
    "Hindustan Unilever",
    "State Bank of India",
    "Bharti Airtel",
    "ITC",
    "Bajaj Finance",
  ];

  const topStocksData = [
    { name: "Reliance", value: 2.5 },
    { name: "TCS", value: 1.8 },
    { name: "HDFC", value: 2.1 },
    { name: "Infosys", value: 1.2 },
    { name: "ICICI", value: 2.3 },
    { name: "HUL", value: 1.7 },
    { name: "SBI", value: 2.9 },
    { name: "Airtel", value: 1.6 },
    { name: "ITC", value: 1.9 },
    { name: "BajajFin", value: 2.0 },
  ];

  const latestNews = [
    {
      title: "Market Hits Record Highs Amidst Positive Global Cues",
      excerpt: "The Sensex and Nifty 50 surged to new all-time highs today...",
    },
    {
      title: "IT Sector Sees Strong Growth in Q3",
      excerpt:
        "Leading IT firms reported better-than-expected earnings for the third quarter...",
    },
    {
      title: "SEBI Introduces New Regulations for Retail Investors",
      excerpt:
        "The market regulator announced new rules aimed at protecting small investors...",
    },
  ];

  // New Resources Section
  const courses = [
    {
      title: "Beginner’s Guide to Stock Market",
      description:
        "Learn the basics of stocks, exchanges, and investment strategies.",
      link: "https://www.nseindia.com/education/content/module1.htm",
    },
    {
      title: "Technical Analysis Fundamentals",
      description:
        "Understand charts, trends, and price movements to make better trading decisions.",
      link: "https://zerodha.com/varsity/",
    },
    {
      title: "Investment Strategies for Long-term Growth",
      description:
        "Explore long-term investment planning, diversification, and portfolio building.",
      link: "https://www.moneycontrol.com/financials/financial-education/",
    },
  ];

  const dematAccounts = [
    {
      title: "Zerodha",
      description:
        "Open a demat and trading account with India’s largest retail stock broker.",
      link: "https://zerodha.com/open-account",
    },
    {
      title: "Upstox",
      description:
        "Get started with online trading and demat account with low brokerage fees.",
      link: "https://upstox.com/open-account/",
    },
    {
      title: "ICICI Direct",
      description:
        "Full-service broker for trading and investment with banking integration.",
      link: "https://www.icicidirect.com/open-account",
    },
  ];

  const investmentTips = [
    "Always diversify your portfolio to reduce risk.",
    "Invest for the long-term rather than trying to time the market.",
    "Research companies thoroughly before investing.",
    "Keep track of market trends but avoid emotional trading.",
    "Consider SIPs (Systematic Investment Plans) for disciplined investing.",
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">Intelligent Market Insights</h1>
        <p className="hero-subtitle">
          Navigate the Indian stock market with data-driven confidence.
        </p>
        <Link to="/dashboard" className="cta-button">
          Explore Dashboard
        </Link>
      </section>

      {/* Main Content Section */}
      <main className="main-content">
        <div className="content-grid">
          {/* Top 10 Companies Section */}
          <section className="info-card">
            <h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Top 10 Companies
            </h2>
            <ol className="data-list">
              {topCompanies.map((company, index) => (
                <li key={index}>{company}</li>
              ))}
            </ol>
          </section>

          {/* Nifty 50 Chart Section */}
          <section className="info-card chart-card">
            <h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Nifty 50 Performance
            </h2>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={nifty50Data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0088FE"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Top 10 Stocks Chart Section */}
          <section className="info-card chart-card">
            <h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              Top 10 Stocks (Daily % Change)
            </h2>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topStocksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Latest News Section */}
          <section className="info-card">
            <h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Latest Market News
            </h2>
            <div className="news-list">
              {latestNews.map((news, index) => (
                <article key={index} className="news-item">
                  <h3>{news.title}</h3>
                  <p>{news.excerpt}</p>
                </article>
              ))}
            </div>
          </section>
          </div>

          {/* --- New Section: Free Courses / Demat / Tips --- */}
          <section className="info2-card mt-5">
  <h2 className="text-info mb-3">Stock Market Resources</h2>

  <div className="info2-content">
    {/* Column 1: Courses */}
    <div className="info2-column">
      <h3>Free Trading Courses</h3>
      {courses.map((course, index) => (
        <div key={index} className="card">
          <h4>{course.title}</h4>
          <p>{course.description}</p>
          <a href={course.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info">
            Access Course
          </a>
        </div>
      ))}
    </div>

    {/* Column 2: Demat Accounts */}
    <div className="info2-column">
      <h3>Open a Demat Account</h3>
      {dematAccounts.map((account, index) => (
        <div key={index} className="card">
          <h4>{account.title}</h4>
          <p>{account.description}</p>
          <a href={account.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-info">
            Open Account
          </a>
        </div>
      ))}
    </div>

    {/* Column 3: Investment Tips */}
    <div className="info2-column">
      <h3>Investment Tips</h3>
      <ul className="list-group list-group-flush">
        {investmentTips.map((tip, index) => (
          <li key={index} className="list-group-item">{tip}</li>
        ))}
      </ul>
    </div>
  </div>
</section>
      </main>
    </div>
  );
};

export default Home;
