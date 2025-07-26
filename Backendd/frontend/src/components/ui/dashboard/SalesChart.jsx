import { useState } from "react";
import { Card, CardContent } from "../Card";
import { Button } from "../Button";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../../lib/queryClient";

export default function SalesChart() {
  const [timeframe, setTimeframe] = useState("monthly");
  
  const { data: salesData, isLoading } = useQuery({
    queryKey: ["/api/sales/chart", timeframe],
    queryFn: () => apiRequest("GET", `/api/sales/chart?timeframe=${timeframe}`).then(res => res.json())
  });

  return (
    <Card className="bg-white shadow h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#264653]">Sales & Revenue</h2>
          <div className="flex space-x-2">
            <Button
              variant={timeframe === "monthly" ? "default" : "ghost"}
              size="sm"
              className={`px-3 py-1 text-xs font-medium rounded ${
                timeframe === "monthly" 
                  ? "bg-[#2A9D8F] text-white" 
                  : "text-[#264653]"
              }`}
              onClick={() => setTimeframe("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={timeframe === "weekly" ? "default" : "ghost"}
              size="sm"
              className={`px-3 py-1 text-xs font-medium rounded ${
                timeframe === "weekly" 
                  ? "bg-[#2A9D8F] text-white" 
                  : "text-[#264653]"
              }`}
              onClick={() => setTimeframe("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={timeframe === "daily" ? "default" : "ghost"}
              size="sm"
              className={`px-3 py-1 text-xs font-medium rounded ${
                timeframe === "daily" 
                  ? "bg-[#2A9D8F] text-white" 
                  : "text-[#264653]"
              }`}
              onClick={() => setTimeframe("daily")}
            >
              Daily
            </Button>
          </div>
        </div>
        <div className="h-72">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-[#2A9D8F] border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="sales" fill="#E9C46A" radius={[4, 4, 0, 0]} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2A9D8F"
                  fill="#2A9D8F"
                  fillOpacity={0.1}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}