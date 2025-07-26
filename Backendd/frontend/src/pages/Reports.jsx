import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, Filter, Calendar, ChevronDown, Printer, BarChart3, LineChart, PieChart, TrendingUp, TrendingDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useToast } from "../hooks/use-toast";

export default function Reports() {
  const { toast } = useToast();
  const [reportPeriod, setReportPeriod] = useState("month");
  const [compareWithPeriod, setCompareWithPeriod] = useState("previous");

  const { data: salesReportData, isLoading: salesReportLoading } = useQuery({
    queryKey: ["/api/reports/sales", reportPeriod],
  });

  const { data: categorySalesData, isLoading: categorySalesLoading } = useQuery({
    queryKey: ["/api/reports/category-sales", reportPeriod],
  });

  const { data: productPerformance, isLoading: productPerformanceLoading } = useQuery({
    queryKey: ["/api/reports/product-performance", reportPeriod],
  });

  const handleDownloadReport = (reportType) => {
    toast({
      title: "Report downloaded",
      description: `${reportType} report has been downloaded successfully`,
    });
  };

  const handlePrintReport = (reportType) => {
    toast({
      title: "Printing report",
      description: `Sending ${reportType} report to printer`,
    });
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#264653]">Reports & Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor your business performance with detailed reports</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Select period" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={compareWithPeriod} onValueChange={setCompareWithPeriod}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Compare with" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous">Previous Period</SelectItem>
              <SelectItem value="lastYear">Same Period Last Year</SelectItem>
              <SelectItem value="none">No Comparison</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="mb-4 bg-[#F4F1DE]">
          <TabsTrigger value="sales" className="data-[state=active]:bg-[#2A9D8F] data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            Sales Reports
          </TabsTrigger>
          <TabsTrigger value="inventory" className="data-[state=active]:bg-[#2A9D8F] data-[state=active]:text-white">
            <LineChart className="h-4 w-4 mr-2" />
            Inventory Reports
          </TabsTrigger>
          <TabsTrigger value="customers" className="data-[state=active]:bg-[#2A9D8F] data-[state=active]:text-white">
            <PieChart className="h-4 w-4 mr-2" />
            Customer Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-6">
          {/* Sales Over Time */}
          <Card className="bg-white shadow">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4">
              <CardTitle className="text-lg font-semibold text-[#264653]">Sales Over Time</CardTitle>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handlePrintReport("Sales Over Time")}
                >
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Print</span>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleDownloadReport("Sales Over Time")}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="h-80">
                {salesReportLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-[#2A9D8F] border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={salesReportData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="#2A9D8F"
                        fill="#2A9D8F"
                        fillOpacity={0.2}
                        name="Actual Sales"
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        stroke="#E9C46A"
                        fill="#E9C46A"
                        fillOpacity={0.2}
                        name="Sales Target"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sales by Category */}
            <Card className="bg-white shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-[#264653]">Sales by Category</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="h-64">
                  {categorySalesLoading ? (
                    <div className="h-full flex items-center justify-center">
                      <div className="animate-spin h-8 w-8 border-4 border-[#2A9D8F] border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={categorySalesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {categorySalesData?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Top Performing Products */}
            <Card className="bg-white shadow md:col-span-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-[#264653]">Top Performing Products</CardTitle>
              </CardHeader>
              
              <CardContent>
                {productPerformanceLoading ? (
                  <div className="py-10 flex justify-center">
                    <div className="animate-spin h-8 w-8 border-4 border-[#2A9D8F] border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {productPerformance?.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 text-gray-500 text-sm">{index + 1}</div>
                          <div>
                            <p className="font-medium text-[#264653]">{product.name}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              {product.trend === "up" ? (
                                <TrendingUp className="h-3 w-3 text-[#27AE60] mr-1" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-[#EB5757] mr-1" />
                              )}
                              <span className={product.trend === "up" ? "text-[#27AE60]" : "text-[#EB5757]"}>
                                {product.percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-[#264653]">{product.sales} sales</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card className="bg-white shadow p-6">
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500">Inventory Reports Coming Soon</p>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card className="bg-white shadow p-6">
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500">Customer Reports Coming Soon</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}