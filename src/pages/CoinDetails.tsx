import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  CreditCard,
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
    <div className="min-h-screen w-full max-w-2xl pb-12 mx-auto text-white p-6 space-y-6 flex flex-col items-center overflow-y-scroll h-screen overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between w-full p-4 border-b border-[#2E2E2E] bg-[#1A1A1A] rounded-lg">
        <ArrowLeft
          className="w-6 h-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-2xl font-bold">{coin.name.toUpperCase()}</h2>
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
          { icon: Building2, label: "Sell" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col px-1 items-center">
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
      <div className="px-4 pb-10">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          {/* Header */}
          <h3 className="text-xl font-bold text-white mb-4">
            About {coin.name}
          </h3>

          {/* Description (Optional if available) */}
          {coin.description?.en && (
            <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3">
              {coin.description.en.replace(/<[^>]+>/g, "") ||
                "No description available"}
            </p>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition">
              <p className="text-gray-400 text-sm">Market Cap</p>
              <p className="text-green-400 text-lg font-semibold">
                ${coin.market_data.market_cap.usd.toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition">
              <p className="text-gray-400 text-sm">24h Volume</p>
              <p className="text-blue-400 text-lg font-semibold">
                ${coin.market_data.total_volume.usd.toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition">
              <p className="text-gray-400 text-sm">Total Volume</p>
              <p className="text-yellow-400 text-lg font-semibold">
                {coin.market_data.total_volume.usd}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
