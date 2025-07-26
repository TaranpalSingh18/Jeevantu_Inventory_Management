// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { CreditCard, CheckCircle, AlertCircle, Download, Search, Filter, ChevronRight } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/Card";
// import { Button } from "../components/ui/Button";
// import { Input } from "../components/ui/Input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/Select";
// import { Badge } from "../components/ui/Badge";
// import { Separator } from "../components/ui/Seperator";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "../components/ui/Tabs";
// import { useToast } from "../hooks/use-toast";

// export default function Payments() {
//   const { toast } = useToast();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [dateFilter, setDateFilter] = useState("week");

//   const { data: paymentStats, isLoading: statsLoading } = useQuery({
//     queryKey: ["/api/payments/stats", dateFilter],
//   });

//   const { data: payments, isLoading: paymentsLoading } = useQuery({
//     queryKey: ["/api/payments", dateFilter],
//   });

//   const handleDownloadReport = () => {
//     toast({
//       title: "Report downloaded",
//       description: "Payment report has been downloaded successfully",
//     });
//   };

//   const filteredPayments = payments?.filter((payment) => {
//     const matchesSearch = payment.id.toString().includes(searchQuery) || 
//                          payment.customerName.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const statusBadgeVariant = (status) => {
//     switch (status) {
//       case "paid":
//         return "bg-[#27AE60] bg-opacity-10 text-[#27AE60]";
//       case "pending":
//         return "bg-[#F2C94C] bg-opacity-10 text-[#F2C94C]";
//       case "failed":
//         return "bg-[#EB5757] bg-opacity-10 text-[#EB5757]";
//       default:
//         return "bg-gray-200 text-gray-700";
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     }).format(date);
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(amount);
//   };

//   return (
//     <div className="px-4 py-6 sm:px-6 lg:px-8">
//       <div className="grid grid-cols-1 gap-6">
//         {/* Payment Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <Card className="bg-white shadow">
//             <CardContent className="pt-6">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center space-x-2">
//                   <CreditCard className="h-5 w-5 text-[#2A9D8F]" />
//                   <h3 className="text-sm font-medium text-[#264653]">Total Payments</h3>
//                 </div>
//                 <Badge variant="outline" className="bg-[#2A9D8F] bg-opacity-10 text-[#2A9D8F] px-2 py-1 text-xs">
//                   {dateFilter === "today" ? "Today" : dateFilter === "week" ? "This Week" : "This Month"}
//                 </Badge>
//               </div>
//               <div className="flex items-baseline mt-4">
//                 <p className="text-2xl font-semibold text-[#264653]">
//                   {statsLoading ? "..." : formatCurrency(paymentStats?.total || 0)}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card className="bg-white shadow">
//             <CardContent className="pt-6">
//               <div className="flex items-center space-x-2 mb-2">
//                 <CheckCircle className="h-5 w-5 text-[#27AE60]" />
//                 <h3 className="text-sm font-medium text-[#264653]">Successful Payments</h3>
//               </div>
//               <div className="flex items-baseline mt-4">
//                 <p className="text-2xl font-semibold text-[#27AE60]">
//                   {statsLoading ? "..." : formatCurrency(paymentStats?.successful || 0)}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card className="bg-white shadow">
//             <CardContent className="pt-6">
//               <div className="flex items-center space-x-2 mb-2">
//                 <AlertCircle className="h-5 w-5 text-[#EB5757]" />
//                 <h3 className="text-sm font-medium text-[#264653]">Failed Payments</h3>
//               </div>
//               <div className="flex items-baseline mt-4">
//                 <p className="text-2xl font-semibold text-[#EB5757]">
//                   {statsLoading ? "..." : formatCurrency(paymentStats?.failed || 0)}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card className="bg-white shadow">
//             <CardContent className="pt-6">
//               <div className="flex items-center space-x-2 mb-2">
//                 <div className="h-5 w-5 flex items-center justify-center text-[#F2C94C]">
//                   <span className="h-2 w-2 bg-[#F2C94C] rounded-full animate-pulse"></span>
//                 </div>
//                 <h3 className="text-sm font-medium text-[#264653]">Pending Payments</h3>
//               </div>
//               <div className="flex items-baseline mt-4">
//                 <p className="text-2xl font-semibold text-[#F2C94C]">
//                   {statsLoading ? "..." : formatCurrency(paymentStats?.pending || 0)}
//                 </p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
        
//         {/* Payment History */}
//         <Card className="bg-white shadow">
//           <CardHeader className="pb-4">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
//               <CardTitle className="text-xl font-semibold text-[#264653]">Payment History</CardTitle>
              
//               <div className="flex space-x-2">
//                 <Tabs value={dateFilter} onValueChange={setDateFilter} className="w-[400px]">
//                   <TabsList>
//                     <TabsTrigger value="today">Today</TabsTrigger>
//                     <TabsTrigger value="week">This Week</TabsTrigger>
//                     <TabsTrigger value="month">This Month</TabsTrigger>
//                   </TabsList>
//                 </Tabs>
                
//                 <Button 
//                   variant="outline" 
//                   className="flex items-center gap-2"
//                   onClick={handleDownloadReport}
//                 >
//                   <Download className="h-4 w-4" />
//                   <span className="hidden sm:inline">Export</span>
//                 </Button>
//               </div>
//             </div>
//           </CardHeader>
          
//           <CardContent>
//             <div className="flex flex-col sm:flex-row gap-4 mb-6">
//               <div className="relative flex-1">
//                 <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
//                 <Input
//                   placeholder="Search by ID or customer name..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
              
//               <div className="w-full sm:w-48">
//                 <Select
//                   value={statusFilter}
//                   onValueChange={(value) => setStatusFilter(value)}
//                 >
//                   <SelectTrigger className="w-full">
//                     <div className="flex items-center">
//                       <Filter className="h-4 w-4 mr-2 text-gray-400" />
//                       <SelectValue placeholder="All Statuses" />
//                     </div>
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Statuses</SelectItem>
//                     <SelectItem value="pending">Pending</SelectItem>
//                     <SelectItem value="paid">Paid</SelectItem>
//                     <SelectItem value="failed">Failed</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
            
//             {paymentsLoading ? (
//               <div className="py-10 flex justify-center">
//                 <div className="animate-spin h-8 w-8 border-4 border-[#2A9D8F] border-t-transparent rounded-full"></div>
//               </div>
//             ) : filteredPayments?.length === 0 ? (
//               <div className="py-10 text-center text-gray-500">
//                 No payments found
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredPayments?.map((payment) => (
//                   <Card key={payment.id} className="overflow-hidden border-0 shadow-sm">
//                     <CardContent className="p-4">
//                       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                         <div className="flex items-center">
//                           <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 
//                             ${payment.method === "credit_card" 
//                               ? "bg-[#2A9D8F] bg-opacity-10 text-[#2A9D8F]" 
//                               : payment.method === "cash"
//                                 ? "bg-[#E9C46A] bg-opacity-10 text-[#E9C46A]"
//                                 : "bg-[#264653] bg-opacity-10 text-[#264653]"
//                             }`}
//                           >
//                             <CreditCard className="h-5 w-5" />
//                           </div>
                          
//                           <div>
//                             <p className="font-medium text-[#264653]">Payment #{payment.id}</p>
//                             <p className="text-xs text-gray-500">
//                               {formatDate(payment.date)} • {payment.method === "credit_card" ? "Credit Card" : payment.method === "cash" ? "Cash" : "Other"}
//                             </p>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center gap-4">
//                           <div className="text-right">
//                             <p className="text-sm text-gray-500">Customer</p>
//                             <p className="font-medium">{payment.customerName}</p>
//                           </div>
                          
//                           <div className="text-right">
//                             <p className="text-sm text-gray-500">Amount</p>
//                             <p className="font-medium">{formatCurrency(payment.amount)}</p>
//                           </div>
                          
//                           <div>
//                             <Badge variant="outline" className={`${statusBadgeVariant(payment.status)} px-2 py-1 rounded-full text-xs`}>
//                               {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
//                             </Badge>
//                           </div>
                          
//                           <Button variant="ghost" size="sm" className="text-[#2A9D8F]">
//                             <ChevronRight className="h-5 w-5" />
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Search, 
  Filter, 
  ChevronRight 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";
import { Separator } from "../components/ui/Seperator";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import { useToast } from "../hooks/use-toast";

// Helper functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const statusBadgeVariant = (status) => {
  switch (status) {
    case "paid":
      return "bg-[#27AE60] bg-opacity-10 text-[#27AE60]";
    case "pending":
      return "bg-[#F2C94C] bg-opacity-10 text-[#F2C94C]";
    case "failed":
      return "bg-[#EB5757] bg-opacity-10 text-[#EB5757]";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

export default function Payments() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("week");

  const { data: paymentStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/payments/stats", dateFilter],
  });

  const { data: payments, isLoading: paymentsLoading } = useQuery({
    queryKey: ["/api/payments", dateFilter],
  });

  const handleDownloadReport = () => {
    toast({
      title: "Report downloaded",
      description: "Payment report has been downloaded successfully",
    });
  };

  // Use _id since payment objects use that as their identifier.
  const filteredPayments = payments?.filter((payment) => {
    const matchesSearch =
      payment._id.toString().includes(searchQuery) ||
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6">
        {/* Payment Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white shadow">
            <CardHeader className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-[#2A9D8F]" />
                  <h3 className="text-sm font-medium text-[#264653]">Total Payments</h3>
                </div>
                <Badge 
                  variant="outline" 
                  className="bg-[#2A9D8F] bg-opacity-10 text-[#2A9D8F] px-2 py-1 text-xs"
                >
                  {dateFilter === "today" ? "Today" : dateFilter === "week" ? "This Week" : "This Month"}
                </Badge>
              </div>
              <div className="flex items-baseline mt-4">
                <p className="text-2xl font-semibold text-[#264653]">
                  {statsLoading ? "..." : formatCurrency(paymentStats?.total || 0)}
                </p>
              </div>
            </CardHeader>
          </Card>
          
          <Card className="bg-white shadow">
            <CardHeader className="pt-6">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-[#27AE60]" />
                <h3 className="text-sm font-medium text-[#264653]">Successful Payments</h3>
              </div>
              <div className="flex items-baseline mt-4">
                <p className="text-2xl font-semibold text-[#27AE60]">
                  {statsLoading ? "..." : formatCurrency(paymentStats?.successful || 0)}
                </p>
              </div>
            </CardHeader>
          </Card>
          
          <Card className="bg-white shadow">
            <CardHeader className="pt-6">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-5 w-5 text-[#EB5757]" />
                <h3 className="text-sm font-medium text-[#264653]">Failed Payments</h3>
              </div>
              <div className="flex items-baseline mt-4">
                <p className="text-2xl font-semibold text-[#EB5757]">
                  {statsLoading ? "..." : formatCurrency(paymentStats?.failed || 0)}
                </p>
              </div>
            </CardHeader>
          </Card>
          
          <Card className="bg-white shadow">
            <CardHeader className="pt-6">
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-5 w-5 flex items-center justify-center text-[#F2C94C]">
                  <span className="h-2 w-2 bg-[#F2C94C] rounded-full animate-pulse"></span>
                </div>
                <h3 className="text-sm font-medium text-[#264653]">Pending Payments</h3>
              </div>
              <div className="flex items-baseline mt-4">
                <p className="text-2xl font-semibold text-[#F2C94C]">
                  {statsLoading ? "..." : formatCurrency(paymentStats?.pending || 0)}
                </p>
              </div>
            </CardHeader>
          </Card>
        </div>
        
        {/* Payment History */}
        <Card className="bg-white shadow">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <CardTitle className="text-xl font-semibold text-[#264653]">Payment History</CardTitle>
              <div className="flex space-x-2">
                <Tabs value={dateFilter} onValueChange={setDateFilter} className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="week">This Week</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleDownloadReport}
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search by ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value)}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2 text-gray-400" />
                      <SelectValue placeholder="All Statuses" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {paymentsLoading ? (
              <div className="py-10 flex justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-[#2A9D8F] border-t-transparent rounded-full"></div>
              </div>
            ) : filteredPayments?.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                No payments found
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPayments?.map((payment) => (
                  <Card key={payment._id} className="overflow-hidden border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${
                            payment.method === "credit_card"
                              ? "bg-[#2A9D8F] bg-opacity-10 text-[#2A9D8F]"
                              : payment.method === "cash"
                              ? "bg-[#E9C46A] bg-opacity-10 text-[#E9C46A]"
                              : "bg-[#264653] bg-opacity-10 text-[#264653]"
                          }`}>
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-[#264653]">Payment #{payment._id}</p>
                            <p className="text-xs text-gray-500">
                              {formatDate(payment.date)} •{" "}
                              {payment.method === "credit_card"
                                ? "Credit Card"
                                : payment.method === "cash"
                                ? "Cash"
                                : "Other"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Customer</p>
                            <p className="font-medium">{payment.customerName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Amount</p>
                            <p className="font-medium">{formatCurrency(payment.amount)}</p>
                          </div>
                          <div>
                            <Badge variant="outline" className={`${statusBadgeVariant(payment.status)} px-2 py-1 rounded-full text-xs`}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm" className="text-[#2A9D8F]">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
