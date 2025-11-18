import React, { useState, useEffect, useRef } from "react";
import "./Chartbot.css";

// ✅ Move this OUTSIDE the component — no export inside function
const allCompanies = {
  banking: {
    HDFCBANK: {
      name: "HDFC Bank Ltd.",
      nse: "HDFCBANK",
      bse: "500180",
      description:
        "India’s largest private sector bank providing banking and financial services.",
      founder: "Hasmukhbhai Parekh",
      netWorth: "₹13.2 Lakh Cr",
      profit: "₹61,000 Cr",
      debt: "₹3.5 Lakh Cr",
      recommendation: "Buy",
    },
    ICICIBANK: {
      name: "ICICI Bank Ltd.",
      nse: "ICICIBANK",
      bse: "532174",
      description:
        "Leading private bank offering a wide range of financial services to retail and corporate clients.",
      founder: "ICICI Group",
      netWorth: "₹8.5 Lakh Cr",
      profit: "₹47,000 Cr",
      debt: "₹2.7 Lakh Cr",
      recommendation: "Buy",
    },
    AXISBANK: {
      name: "Axis Bank Ltd.",
      nse: "AXISBANK",
      bse: "532215",
      description: "Third-largest private sector bank in India.",
      founder: "Suhas Gopinath & Axis Group",
      netWorth: "₹4.9 Lakh Cr",
      profit: "₹23,000 Cr",
      debt: "₹2.2 Lakh Cr",
      recommendation: "Buy",
    },
    KOTAKBANK: {
      name: "Kotak Mahindra Bank Ltd.",
      nse: "KOTAKBANK",
      bse: "500247",
      description:
        "One of India’s major private banks offering retail and corporate banking services.",
      founder: "Uday Kotak",
      netWorth: "₹4.5 Lakh Cr",
      profit: "₹14,000 Cr",
      debt: "₹0.8 Lakh Cr",
      recommendation: "Buy",
    },
    SBIN: {
      name: "State Bank of India",
      nse: "SBIN",
      bse: "500112",
      description:
        "India’s largest public sector bank offering a wide range of financial services.",
      founder: "Government of India",
      netWorth: "₹15.5 Lakh Cr",
      profit: "₹56,000 Cr",
      debt: "₹3.8 Lakh Cr",
      recommendation: "Buy",
    },
  },
  // ✅ You can keep adding more industries here (IT, energy, FMCG, etc.)
   it: {
    TCS: {
      name: "Tata Consultancy Services Ltd.",
      nse: "TCS",
      bse: "532540",
      description: "India’s largest IT services and consulting firm.",
      founder: "Tata Group",
      netWorth: "₹13 Lakh Cr",
      profit: "₹46,000 Cr",
      debt: "₹0.1 Lakh Cr",
      recommendation: "Buy",
    },
    INFY: {
      name: "Infosys Ltd.",
      nse: "INFY",
      bse: "500209",
      description:
        "Global IT services and consulting company headquartered in Bengaluru.",
      founder: "N. R. Narayana Murthy",
      netWorth: "₹6.7 Lakh Cr",
      profit: "₹24,000 Cr",
      debt: "₹0.1 Lakh Cr",
      recommendation: "Buy",
    },
    WIPRO: {
      name: "Wipro Ltd.",
      nse: "WIPRO",
      bse: "507685",
      description:
        "Indian multinational providing IT and business process services.",
      founder: "Azim Premji",
      netWorth: "₹3.2 Lakh Cr",
      profit: "₹11,000 Cr",
      debt: "₹0.1 Lakh Cr",
      recommendation: "Hold",
    },
    HCLTECH: {
      name: "HCL Technologies Ltd.",
      nse: "HCLTECH",
      bse: "532281",
      description:
        "Global IT services and consulting company based in Noida.",
      founder: "Shiv Nadar",
      netWorth: "₹3.5 Lakh Cr",
      profit: "₹14,000 Cr",
      debt: "₹0.2 Lakh Cr",
      recommendation: "Buy",
    },
    TECHM: {
      name: "Tech Mahindra Ltd.",
      nse: "TECHM",
      bse: "532755",
      description:
        "Part of Mahindra Group, offering IT and telecom solutions globally.",
      founder: "Anand Mahindra",
      netWorth: "₹1.3 Lakh Cr",
      profit: "₹4,000 Cr",
      debt: "₹0.3 Lakh Cr",
      recommendation: "Hold",
    },
  },

  energy: {
    RELIANCE: {
      name: "Reliance Industries Ltd.",
      nse: "RELIANCE",
      bse: "500325",
      description:
        "Conglomerate with interests in energy, retail, telecom, and petrochemicals.",
      founder: "Dhirubhai Ambani",
      netWorth: "₹19 Lakh Cr",
      profit: "₹75,000 Cr",
      debt: "₹3.4 Lakh Cr",
      recommendation: "Buy",
    },
    NTPC: {
      name: "NTPC Ltd.",
      nse: "NTPC",
      bse: "532555",
      description:
        "India’s largest power generation company (thermal, hydro, renewables).",
      founder: "Government of India",
      netWorth: "₹2.5 Lakh Cr",
      profit: "₹19,000 Cr",
      debt: "₹1.1 Lakh Cr",
      recommendation: "Buy",
    },
    ONGC: {
      name: "Oil and Natural Gas Corporation Ltd.",
      nse: "ONGC",
      bse: "500312",
      description:
        "Major oil and gas exploration & production company.",
      founder: "Government of India",
      netWorth: "₹2.3 Lakh Cr",
      profit: "₹40,000 Cr",
      debt: "₹0.9 Lakh Cr",
      recommendation: "Hold",
    },
    ADANIPORTS: {
      name: "Adani Ports & SEZ Ltd.",
      nse: "ADANIPORTS",
      bse: "532921",
      description: "Largest private multi-port operator in India.",
      founder: "Gautam Adani",
      netWorth: "₹1.6 Lakh Cr",
      profit: "₹5,000 Cr",
      debt: "₹1.0 Lakh Cr",
      recommendation: "Buy",
    },
    JSWSTEEL: {
      name: "JSW Steel Ltd.",
      nse: "JSWSTEEL",
      bse: "500228",
      description: "Leading steel manufacturing company in India.",
      founder: "Sajjan Jindal",
      netWorth: "₹1.5 Lakh Cr",
      profit: "₹8,000 Cr",
      debt: "₹0.9 Lakh Cr",
      recommendation: "Hold",
    },
    HINDALCO: {
      name: "Hindalco Industries Ltd.",
      nse: "HINDALCO",
      bse: "500440",
      description:
        "Leading aluminium and copper manufacturing company under Aditya Birla Group.",
      founder: "Aditya Vikram Birla",
      netWorth: "₹1.2 Lakh Cr",
      profit: "₹6,000 Cr",
      debt: "₹0.6 Lakh Cr",
      recommendation: "Hold",
    },
    POWERGRID: {
      name: "Power Grid Corporation of India Ltd.",
      nse: "POWERGRID",
      bse: "532898",
      description: "Government-owned power transmission company.",
      founder: "Government of India",
      netWorth: "₹2 Lakh Cr",
      profit: "₹15,000 Cr",
      debt: "₹0.8 Lakh Cr",
      recommendation: "Buy",
    },
  },

  auto: {
    TATAMOTORS: {
      name: "Tata Motors Ltd.",
      nse: "TATAMOTORS",
      bse: "500570",
      description:
        "Leading automotive manufacturing company under Tata Group.",
      founder: "J.R.D. Tata",
      netWorth: "₹3.1 Lakh Cr",
      profit: "₹20,000 Cr",
      debt: "₹1.2 Lakh Cr",
      recommendation: "Buy",
    },
    EICHERMOT: {
      name: "Eicher Motors Ltd.",
      nse: "EICHERMOT",
      bse: "505200",
      description:
        "Manufacturer of Royal Enfield motorcycles and commercial vehicles.",
      founder: "Vikram Lal",
      netWorth: "₹1.1 Lakh Cr",
      profit: "₹3,000 Cr",
      debt: "₹0.1 Lakh Cr",
      recommendation: "Hold",
    },
    MARUTI: {
      name: "Maruti Suzuki India Ltd.",
      nse: "MARUTI",
      bse: "532500",
      description: "India’s leading passenger car manufacturer.",
      founder: "Government of India & Suzuki Motor Corp.",
      netWorth: "₹3 Lakh Cr",
      profit: "₹14,000 Cr",
      debt: "₹0.6 Lakh Cr",
      recommendation: "Buy",
    },
  },

  fmcg: {
    ITC: {
      name: "ITC Ltd.",
      nse: "ITC",
      bse: "500875",
      description:
        "Diversified conglomerate in FMCG, hotels, agri, paper, and packaging.",
      founder: "ITC Group",
      netWorth: "₹5.5 Lakh Cr",
      profit: "₹20,000 Cr",
      debt: "₹0.3 Lakh Cr",
      recommendation: "Hold",
    },
    HINDUNILVR: {
      name: "Hindustan Unilever Ltd.",
      nse: "HINDUNILVR",
      bse: "500696",
      description:
        "India’s largest FMCG company with brands like Dove, Surf Excel, and Horlicks.",
      founder: "Lever Brothers",
      netWorth: "₹6.5 Lakh Cr",
      profit: "₹10,000 Cr",
      debt: "₹0.2 Lakh Cr",
      recommendation: "Buy",
    },
    NESTLEIND: {
      name: "Nestle India Ltd.",
      nse: "NESTLEIND",
      bse: "500790",
      description:
        "FMCG company producing food, beverages, and dairy products.",
      founder: "Nestlé S.A.",
      netWorth: "₹1.1 Lakh Cr",
      profit: "₹2,200 Cr",
      debt: "₹0.1 Lakh Cr",
      recommendation: "Buy",
    },
    ASIANPAINT: {
      name: "Asian Paints Ltd.",
      nse: "ASIANPAINT",
      bse: "500820",
      description: "India’s largest paint company.",
      founder: "Chimanlal Choksi & team",
      netWorth: "₹1.7 Lakh Cr",
      profit: "₹4,000 Cr",
      debt: "₹0.2 Lakh Cr",
      recommendation: "Buy",
    },
    TITAN: {
      name: "Titan Company Ltd.",
      nse: "TITAN",
      bse: "500114",
      description:
        "Leading lifestyle company in watches, jewelry, and eyewear.",
      founder: "Tata Group",
      netWorth: "₹3 Lakh Cr",
      profit: "₹4,500 Cr",
      debt: "₹0.2 Lakh Cr",
      recommendation: "Hold",
    },
  },

  pharma: {
    SUNPHARMA: {
      name: "Sun Pharmaceutical Industries Ltd.",
      nse: "SUNPHARMA",
      bse: "524715",
      description: "India’s largest pharmaceutical company.",
      founder: "Dilip Shanghvi",
      netWorth: "₹3.2 Lakh Cr",
      profit: "₹9,500 Cr",
      debt: "₹0.5 Lakh Cr",
      recommendation: "Buy",
    },
    DRREDDY: {
      name: "Dr. Reddy’s Laboratories Ltd.",
      nse: "DRREDDY",
      bse: "500124",
      description: "Multinational pharma company headquartered in Hyderabad.",
      founder: "K. Anji Reddy",
      netWorth: "₹1.2 Lakh Cr",
      profit: "₹5,000 Cr",
      debt: "₹0.3 Lakh Cr",
      recommendation: "Hold",
    },
    LUPIN: {
      name: "Lupin Ltd.",
      nse: "LUPIN",
      bse: "500257",
      description: "Global pharmaceutical company producing generic drugs.",
      founder: "Dr. Desh Bandhu Gupta",
      netWorth: "₹0.9 Lakh Cr",
      profit: "₹1,800 Cr",
      debt: "₹0.3 Lakh Cr",
      recommendation: "Buy",
    },
  },
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "👋 Hello! I'm Stockfyy AI — your financial assistant. Ask about any company (like Reliance, TCS, Infosys...) or market trends!",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setMessages((prev) => [...prev, { text: userText, sender: "user" }]);
    setInputValue("");
    setIsLoading(true);

    // 🔍 Search company from all industries
    const key = userText.toUpperCase();
    let foundCompany = null;

    for (const sector in allCompanies) {
      if (allCompanies[sector][key]) {
        foundCompany = allCompanies[sector][key];
        break;
      }
    }

    if (foundCompany) {
      const info = foundCompany;
      const reply = `
📊 <b>${info.name}</b><br/>
🏦 <b>NSE:</b> ${info.nse} | <b>BSE:</b> ${info.bse}<br/>
💬 ${info.description}<br/>
💰 <b>Net Worth:</b> ${info.netWorth}<br/>
💸 <b>Debt:</b> ${info.debt}<br/>
📈 <b>Profit (FY2024):</b> ${info.profit}<br/>
💡 <b>Recommendation:</b> ${info.recommendation}<br/>
👤 <b>Founder:</b> ${info.founder}
      `;
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
      setIsLoading(false);
      return;
    }

    // 🧠 If not found, query Gemini API
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Stockfyy AI, a financial assistant. Reply professionally to: "${userText}"`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const botText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I didn’t get that.";
      setMessages((prev) => [...prev, { text: botText, sender: "bot" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: `⚠️ ${err.message}`, sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="chat-button" onClick={() => setIsOpen(!isOpen)}>
        🤖
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Stockfyy AI</span>
            <button
              type="button"
              className="btn-close"
              onClick={() => setIsOpen(false)}
            ></button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: msg.text.replace(/\n/g, "<br/>"),
                  }}
                />
              </div>
            ))}
            {isLoading && <div className="message bot">🤔 Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="chat-input-area">
            <input
              type="text"
              className="form-control"
              placeholder="Ask about stocks, markets, or finance..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="btn btn-primary ms-2"
              disabled={isLoading}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
