import { Spin } from "antd";
import { useEffect, useState } from "react";
import {
  BarChart,
  PieChart,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getBookingStatisticsAPI } from "~/apis";
import Card from "~/components/CardDashboard/CardDashboard";
import { formatVND } from "~/utils/formatters";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = () => {
      setLoading(true);
      getBookingStatisticsAPI()
        .then((res) => {
          setStatistics(res);
        })
        .finally(() => setLoading(false));
    };

    fetchStatistics();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  console.log(statistics);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Thống kê đặt phòng</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card title="Tổng đặt phòng" value={statistics?.totalBookings} />
        <Card
          title="Đơn đặt phòng thành công"
          value={
            statistics?.bookingsByStatus.find((b) => b._id === "COMPLETED")
              ?.count || 0
          }
        />
        <Card
          title="Doanh thu"
          value={`${formatVND(
            statistics?.revenueData.reduce(
              (sum, month) => sum + month.total,
              0
            ) || 0
          )}`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Đơn đặt phòng</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={statistics?.bookingsByStatus}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="_id"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {statistics?.bookingsByStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Doanh thu theo tháng</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={statistics?.revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="_id"
                tickFormatter={(month) =>
                  new Date(0, month - 1).toLocaleString("default", {
                    month: "short",
                  })
                }
              />
              <YAxis tickFormatter={(value) => Math.ceil(value / 1000) + "k"} />
              <Tooltip
                formatter={(value) => [`$${value}`, "Doanh thu"]}
                labelFormatter={(month) =>
                  new Date(0, month - 1).toLocaleString("default", {
                    month: "long",
                  })
                }
              />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
