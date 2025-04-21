"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  CircularProgress,
  Box,
  Alert,
  Button,
  Divider,
  Chip,
  Paper,
  Tooltip,
  Container,
  Grid,
} from "@mui/material";
import {
  TrendingUp,
  Refresh,
  TrendingUp as TrendingUpIcon,
  EmojiEmotions,
  ShowChart,
  Info,
  AttachMoney,
} from "@mui/icons-material";

export default function StockTipsPage() {
  const [stockTip, setStockTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);

  const fetchStockTip = async () => {
    setLoading(true);
    setError(null);
    setErrorDetails(null);
    try {
      const response = await fetch("/api/stock-tip");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch stock tip");
      }

      setStockTip(data);
    } catch (err) {
      console.error("Error fetching stock tip:", err);
      setError(err.message);

      // Try to extract additional error details if available
      try {
        const errorData = await err.response?.json();
        if (errorData && errorData.details) {
          setErrorDetails(errorData.details);
        }
      } catch (e) {
        // Ignore parsing errors
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockTip();
  }, []);

  // Function to render the stock chart
  const renderStockChart = () => {
    if (
      !stockTip ||
      !stockTip.historicalData ||
      stockTip.historicalData.length === 0
    ) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={200}
        >
          <Typography variant="body2" color="textSecondary">
            Chart data not available
          </Typography>
        </Box>
      );
    }

    const data = stockTip.historicalData;
    const width = 700;
    const height = 300;
    const padding = 40;

    // Calculate min and max values for scaling
    const minPrice = Math.min(...data.map((d) => parseFloat(d.low)));
    const maxPrice = Math.max(...data.map((d) => parseFloat(d.high)));
    const priceRange = maxPrice - minPrice;

    // Add some padding to the price range
    const paddedMinPrice = minPrice - priceRange * 0.1;
    const paddedMaxPrice = maxPrice + priceRange * 0.1;
    const paddedPriceRange = paddedMaxPrice - paddedMinPrice;

    // Calculate scaling factors
    const xScale = (width - padding * 2) / (data.length - 1);
    const yScale = (height - padding * 2) / paddedPriceRange;

    // Generate points for the line chart
    const points = data
      .map((d, i) => {
        const x = padding + i * xScale;
        const y =
          height - (padding + (parseFloat(d.close) - paddedMinPrice) * yScale);
        return `${x},${y}`;
      })
      .join(" ");

    // Generate candlestick data
    const candlesticks = data.map((d, i) => {
      const x = padding + i * xScale;
      const openY =
        height - (padding + (parseFloat(d.open) - paddedMinPrice) * yScale);
      const closeY =
        height - (padding + (parseFloat(d.close) - paddedMinPrice) * yScale);
      const highY =
        height - (padding + (parseFloat(d.high) - paddedMinPrice) * yScale);
      const lowY =
        height - (padding + (parseFloat(d.low) - paddedMinPrice) * yScale);

      const isUp = parseFloat(d.close) >= parseFloat(d.open);
      const color = isUp ? "#4caf50" : "#f44336";

      return {
        x,
        openY,
        closeY,
        highY,
        lowY,
        color,
        date: d.date,
        price: d.close,
        open: d.open,
        high: d.high,
        low: d.low,
        volume: d.volume,
      };
    });

    // Generate y-axis labels
    const yAxisLabels = [];
    const numLabels = 5;
    for (let i = 0; i <= numLabels; i++) {
      const price = paddedMinPrice + (paddedPriceRange * i) / numLabels;
      const y = height - (padding + (price - paddedMinPrice) * yScale);
      yAxisLabels.push({
        price: price.toFixed(2),
        y,
      });
    }

    return (
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography variant="caption" color="textSecondary">
            Note: This is simulated historical data for demonstration purposes
          </Typography>
          <Tooltip title="Due to API rate limits, we're showing simulated data based on the current stock performance">
            <Info
              fontSize="small"
              sx={{ ml: 1, color: "text.secondary", cursor: "pointer" }}
            />
          </Tooltip>
        </Box>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {/* Y-axis */}
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#ccc"
            strokeWidth="1"
          />

          {/* X-axis */}
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#ccc"
            strokeWidth="1"
          />

          {/* Y-axis labels */}
          {yAxisLabels.map((label, i) => (
            <g key={i}>
              <line
                x1={padding - 5}
                y1={label.y}
                x2={padding}
                y2={label.y}
                stroke="#ccc"
                strokeWidth="1"
              />
              <text
                x={padding - 10}
                y={label.y + 4}
                textAnchor="end"
                fontSize="10"
              >
                ${label.price}
              </text>
            </g>
          ))}

          {/* Candlesticks */}
          {candlesticks.map((candle, i) => (
            <g key={i}>
              {/* Vertical line (high-low) */}
              <line
                x1={candle.x}
                y1={candle.highY}
                x2={candle.x}
                y2={candle.lowY}
                stroke={candle.color}
                strokeWidth="1"
              />

              {/* Candlestick body */}
              <rect
                x={candle.x - 3}
                y={Math.min(candle.openY, candle.closeY)}
                width="6"
                height={Math.abs(candle.closeY - candle.openY)}
                fill={candle.color}
              />

              {/* X-axis labels (dates) - show every 5th date */}
              {i % 5 === 0 && (
                <text
                  x={candle.x}
                  y={height - padding + 15}
                  textAnchor="middle"
                  fontSize="10"
                  transform={`rotate(-45, ${candle.x}, ${
                    height - padding + 15
                  })`}
                >
                  {new Date(candle.date).toLocaleDateString()}
                </text>
              )}
            </g>
          ))}

          {/* Line chart */}
          <polyline
            points={points}
            fill="none"
            stroke="#2196f3"
            strokeWidth="2"
          />
        </svg>
      </Box>
    );
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              startIcon={<Refresh />}
              onClick={fetchStockTip}
            >
              Retry
            </Button>
          }
        >
          <Typography variant="h6" gutterBottom>
            Error Loading Stock Tip
          </Typography>
          <Typography variant="body1">{error}</Typography>

          {errorDetails && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2">{errorDetails}</Typography>
            </>
          )}

          <Typography variant="body2" sx={{ mt: 2 }}>
            If you're seeing an API key error, make sure you've:
          </Typography>
          <ul>
            <li>
              Obtained a free API key from{" "}
              <Link
                href="https://www.alphavantage.co/support/#api-key"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alpha Vantage
              </Link>
            </li>
            <li>
              Added it to your .env file as
              ALPHA_VANTAGE_API_KEY=your_actual_key
            </li>
            <li>Restarted your Next.js development server</li>
          </ul>

          <Typography variant="body2" sx={{ mt: 2 }}>
            If you're seeing "No suitable stock tips found", this could be due
            to:
          </Typography>
          <ul>
            <li>No top gainers data available</li>
            <li>API rate limits (free tier has limited requests)</li>
            <li>Issues with the Alpha Vantage API service</li>
          </ul>
        </Alert>
      </Container>
    );
  }

  if (!stockTip) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <Typography>No stock tips available at the moment.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box sx={{ bgcolor: "primary.main", color: "white", p: 3 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <TrendingUp sx={{ mr: 1 }} />
              <Typography variant="h4" component="h1" fontWeight="500">
                Daily Stock Tip
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Refresh />}
              onClick={fetchStockTip}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
              }}
            >
              Refresh
            </Button>
          </Box>
        </Box>

        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography
                  variant="h4"
                  color="primary"
                  sx={{ mr: 2, fontWeight: 600 }}
                >
                  {stockTip.ticker}
                </Typography>
                <Chip
                  icon={<TrendingUpIcon />}
                  label={`${stockTip.changePercentage}%`}
                  color="success"
                  sx={{
                    fontSize: "1rem",
                    py: 1,
                    px: 2,
                  }}
                />
              </Box>

              <Typography variant="h5" gutterBottom fontWeight="500">
                {stockTip.name}
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{ color: "text.secondary", mb: 3 }}
              >
                {stockTip.explanation}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "primary.light",
                  p: 3,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EmojiEmotions
                  sx={{ mr: 2, color: "primary.main", fontSize: 28 }}
                />
                <Typography
                  variant="body1"
                  color="primary.contrastText"
                  sx={{ fontSize: "1.1rem" }}
                >
                  {stockTip.joke}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Box mt={2} mb={3}>
                <Box display="flex" alignItems="center" mb={2}>
                  <ShowChart color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" fontWeight="500">
                    Price History
                  </Typography>
                </Box>
                {renderStockChart()}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: 2, bgcolor: "grey.50" }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <AttachMoney color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1" fontWeight="500">
                        Current Price
                      </Typography>
                    </Box>
                    <Typography variant="h5" color="primary" fontWeight="600">
                      ${parseFloat(stockTip.price).toFixed(2)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <ShowChart color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1" fontWeight="500">
                        Volume
                      </Typography>
                    </Box>
                    <Typography variant="h5" color="primary" fontWeight="600">
                      {parseInt(stockTip.volume).toLocaleString()}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body2" color="textSecondary">
                        Source: {stockTip.source}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Updated:{" "}
                        {new Date(stockTip.timePublished).toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
