import { NextResponse } from "next/server";
import axios from "axios";

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Stock-related jokes that can be customized with the stock ticker
const stockJokes = [
  "Why did {ticker} investors bring a ladder to the trading floor? Because they heard the stock was going up! 📈",
  "What did the {ticker} trader say when the market crashed? 'I'm not worried, I'm already used to being down!' 📉",
  "Why did the {ticker} stock go to therapy? Because it had too many ups and downs! 🎢",
  "What's a {ticker} investor's favorite dance? The market shuffle! 💃",
  "Why did the {ticker} trader bring a calculator to the beach? To count their gains in the sand! 🏖️",
  "What do you call a {ticker} investor who's always optimistic? A bull market believer! 🐂",
  "Why did the {ticker} stock take a vacation? Because it needed a break from all the volatility! ✈️",
  "What's a {ticker} trader's favorite weather? A bull market! ☀️",
  "Why did the {ticker} investor bring a map to Wall Street? Because they heard there were lots of charts! 📊",
  "What do you call a {ticker} stock that's always going up? A dream come true! 🌟",
];

function generateStockJoke(ticker) {
  const randomJoke = stockJokes[Math.floor(Math.random() * stockJokes.length)];
  return randomJoke.replace(/{ticker}/g, ticker);
}

// Generate mock historical data for demonstration
function generateMockHistoricalData(ticker, currentPrice, changePercentage) {
  const data = [];
  const today = new Date();
  const volatility = Math.abs(parseFloat(changePercentage)) / 100;

  // Generate 30 days of mock data
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Create a trend that ends at the current price
    const progress = i / 30; // 0 to 1
    const basePrice = currentPrice * (1 - (changePercentage / 100) * progress);

    // Add some randomness
    const randomFactor = 1 + (Math.random() - 0.5) * volatility * 0.5;
    const closePrice = basePrice * randomFactor;

    // Generate OHLC data
    const openPrice = closePrice * (1 + (Math.random() - 0.5) * 0.02);
    const highPrice =
      Math.max(openPrice, closePrice) * (1 + Math.random() * 0.01);
    const lowPrice =
      Math.min(openPrice, closePrice) * (1 - Math.random() * 0.01);
    const volume = Math.floor(Math.random() * 1000000) + 500000;

    data.push({
      date: date.toISOString().split("T")[0],
      open: openPrice.toFixed(2),
      high: highPrice.toFixed(2),
      low: lowPrice.toFixed(2),
      close: closePrice.toFixed(2),
      volume: volume,
    });
  }

  return data;
}

async function getTopGainers() {
  try {
    if (
      !ALPHA_VANTAGE_API_KEY ||
      ALPHA_VANTAGE_API_KEY === "your_api_key_here"
    ) {
      console.error(
        "Alpha Vantage API key is missing or not configured properly"
      );
      return { error: "API key not configured" };
    }

    console.log(
      "Fetching top gainers with API key:",
      ALPHA_VANTAGE_API_KEY.substring(0, 4) + "..."
    );

    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    // Check if the API returned an error message
    if (response.data.Note || response.data.Information) {
      console.error("Alpha Vantage API error:", response.data);
      return { error: response.data.Note || response.data.Information };
    }

    // Log the structure of the response to help diagnose issues
    console.log("API Response structure:", {
      hasTopGainers: !!response.data.top_gainers,
      topGainersLength: response.data.top_gainers
        ? response.data.top_gainers.length
        : 0,
      keys: Object.keys(response.data),
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching top gainers:", error.message);
    if (error.response) {
      console.error("API response error:", error.response.data);
      return {
        error: `API error: ${error.response.status} - ${JSON.stringify(
          error.response.data
        )}`,
      };
    }
    return { error: `Network error: ${error.message}` };
  }
}

function analyzeTopGainers(data) {
  if (!data || data.error) {
    console.error("Invalid data:", data);
    return null;
  }

  if (!data.top_gainers || data.top_gainers.length === 0) {
    console.error("No top gainers data in response:", data);
    return null;
  }

  console.log(`Found ${data.top_gainers.length} top gainers`);

  // Get the top gainer
  const topGainer = data.top_gainers[0];
  console.log("Top gainer:", {
    ticker: topGainer.ticker,
    changePercentage: topGainer.change_percentage,
    price: topGainer.price,
  });

  // Parse the price and change percentage
  const price = parseFloat(topGainer.price);
  const changePercentage = parseFloat(topGainer.change_percentage);

  // Generate mock historical data
  const historicalData = generateMockHistoricalData(
    topGainer.ticker,
    price,
    changePercentage
  );

  // Get company overview for the top gainer
  return {
    ticker: topGainer.ticker,
    name: topGainer.name,
    price: topGainer.price,
    changePercentage: topGainer.change_percentage,
    volume: topGainer.volume,
    // Add a generic explanation since we don't have news data
    explanation: `This stock has shown significant positive momentum with a ${topGainer.change_percentage} increase in price today.`,
    source: "Alpha Vantage",
    timePublished: new Date().toISOString(),
    joke: generateStockJoke(topGainer.ticker),
    historicalData: historicalData,
  };
}

export async function GET() {
  try {
    const gainersData = await getTopGainers();

    // If there's an error in the data, return it
    if (gainersData.error) {
      return NextResponse.json({ error: gainersData.error }, { status: 400 });
    }

    const stockTip = analyzeTopGainers(gainersData);

    if (!stockTip) {
      return NextResponse.json(
        {
          error: "No suitable stock tips found",
          details:
            "The API returned data, but no suitable stock tips were found. This could be due to no top gainers data available.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(stockTip);
  } catch (error) {
    console.error("Error in stock tip API:", error);
    return NextResponse.json(
      { error: `Failed to generate stock tip: ${error.message}` },
      { status: 500 }
    );
  }
}
