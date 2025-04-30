import { Spin } from "antd";
import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getBookingStatisticsAPI } from "~/apis";
import Card from "~/components/CardDashboard/CardDashboard";
import { formatVND } from "~/utils/formatters";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const fetchStatistics = () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedMonth) params.append("month", selectedMonth);
      if (selectedDay) params.append("day", selectedDay);

      getBookingStatisticsAPI(params)
        .then((res) => {
          setStatistics(res);
        })
        .finally(() => setLoading(false));
    };

    fetchStatistics();
  }, [selectedMonth, selectedDay]);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  const processedRevenueData = (statistics?.revenueData || []).map((item) => {
    const id = item._id;
    if (id && typeof id === "object") {
      if (id.day && id.month) {
        return { ...item, label: `Ngày ${id.day}/${id.month}` };
      }
      if (id.day) {
        return { ...item, label: `Ngày ${id.day}` };
      }
      if (id.month) {
        return { ...item, label: `Tháng ${id.month}` };
      }
    }
    if (typeof id === "number") {
      return { ...item, label: `Tháng ${id}` };
    }
    return { ...item, label: "" };
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium">Thống kê đặt phòng</h1>
        <div className="flex gap-4">
          <DatePicker
            picker="month"
            placeholder="Chọn tháng"
            style={{ width: 150 }}
            value={selectedMonth ? dayjs().month(selectedMonth - 1) : null}
            onChange={(date) => {
              setSelectedMonth(date ? date.month() + 1 : null);
              setSelectedDay(null);
            }}
            allowClear
          />
          <DatePicker
            picker="date"
            placeholder="Chọn ngày"
            style={{ width: 150 }}
            value={selectedDay ? dayjs().date(selectedDay) : null}
            onChange={(date) => {
              setSelectedDay(date ? date.date() : null);
            }}
            allowClear
            disabled={!selectedMonth}
            disabledDate={(current) => {
              if (!selectedMonth) return true;
              return current.month() + 1 !== selectedMonth;
            }}
          />
        </div>
      </div>

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
            statistics?.revenueData?.reduce(
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
                {statistics?.bookingsByStatus?.map((entry, index) => (
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
          {statistics?.revenueData?.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={processedRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <Tooltip
                  formatter={(value) => [`${formatVND(value)}`, "Doanh thu"]}
                  labelFormatter={(id) => {
                    if (id && typeof id === "object") {
                      if (id.day && id.month) {
                        return `Ngày ${id.day} tháng ${id.month}`;
                      }
                      if (id.day) {
                        return `Ngày ${id.day}`;
                      }
                      if (id.month) {
                        return `Tháng ${id.month}`;
                      }
                    }
                    if (typeof id === "number") {
                      return `Tháng ${id}`;
                    }
                    return "";
                  }}
                />
                <YAxis
                  tickFormatter={(value) => Math.ceil(value / 1000) + "k"}
                />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Doanh thu" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[350px]">
              <p className="text-gray-500">
                Không có dữ liệu doanh thu cho khoảng thời gian đã chọn
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
