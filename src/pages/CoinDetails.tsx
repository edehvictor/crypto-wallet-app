import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  CreditCard,
  RotateCcw,
  Building2,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { fetchCoinDetails } from "@/lib/coingecko";

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
    market_cap: { usd: number };
    total_volume: { usd: number };
  };
  description: { en: string };
}

interface ChartDataPoint {
  timestamp: number;
  price: number;
}

export default function CoinDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coin, setCoin] = useState<CoinData | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchCoinDetails(id as string);
      setCoin(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchChartData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
        );
        const data = await res.json();
        const formatted = data.prices.map(
          ([time, price]: [number, number]) => ({
            timestamp: time,
            price,
          })
        );
        setChartData(formatted);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChartData();
  }, [id]);

  if (loading)
    return <div className="text-center p-8 text-white">Loading...</div>;
  if (!coin)
    return <div className="text-center p-8 text-white">Coin not found.</div>;

  const timeframes = ["1H", "1D", "1W", "1M", "1Y"];
  const isPositive = coin.market_data.price_change_percentage_24h >= 0;

  return (
    <div className=" text-white min-h-screen max-w-2xl mx-auto px-4 py-2">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <ArrowLeft
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg font-semibold">{coin.symbol.toUpperCase()}</h1>
        <div className="w-6 h-6" />
      </div>

      {/* Balance Section */}
      <div className="p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="text-4xl font-bold mb-2">
          ${coin.market_data.current_price.usd.toLocaleString()}
        </div>
        <div
          className={`text-sm ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {coin.market_data.price_change_percentage_24h.toFixed(2)}%
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between px-6 mb-8">
        {[
          { icon: ArrowUp, label: "Send" },
          { icon: ArrowDown, label: "Receive" },
          { icon: CreditCard, label: "Buy" },
          { icon: RotateCcw, label: "Swap" },
          { icon: Building2, label: "Sell" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-2">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-400">{label}</span>
          </div>
        ))}
      </div>

      {/* Price Chart Section */}
      <div className="px-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="h-40 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="timestamp" hide />
                  <YAxis hide domain={["dataMin", "dataMax"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      borderRadius: "4px",
                    }}
                    labelFormatter={(label) =>
                      new Date(label).toLocaleDateString()
                    }
                    formatter={(value: number) => `$${value.toFixed(2)}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: "#10b981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading chart...
              </div>
            )}
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-center gap-4">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTimeframe === tf
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Market Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">Market Cap</p>
          <p className="text-lg font-bold">
            ${coin.market_data.market_cap.usd.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-400 text-sm">24h Volume</p>
          <p className="text-lg font-bold">
            ${coin.market_data.total_volume.usd.toLocaleString()}
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 pb-10">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">About {coin.name}</h3>
          <p
            className="text-gray-400 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: coin.description.en || "No description available.",
            }}
          ></p>
        </div>
      </div>
    </div>
  );
}
