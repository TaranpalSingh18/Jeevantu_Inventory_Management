// import { useState } from "react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { apiRequest, queryClient } from "../lib/queryClient";
// import { useToast } from "../hooks/use-toast";
// import { ShoppingBag, Search, Calendar, ArrowDown, Eye, Download } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../components/ui/Table";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/Card";
// import { Button } from "../components/ui/Button";
// import { Input } from "../components/ui/Input";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "../components/ui/Dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/Select";
// import { Badge } from "../components/ui/Badge";
// import { Separator } from "../components/ui/Seperator";

// export default function Sales() {
//   const { toast } = useToast();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [viewSale, setViewSale] = useState(null);
//   const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

//   const { data: sales, isLoading } = useQuery({
//     queryKey: ["/api/sales"],
//   });

//   const filteredSales = sales?.filter((sale) => {
//     const matchesSearch = sale.id.toString().includes(searchQuery) || 
//                          sale.customerName.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = statusFilter === "all" || sale.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const handleViewSale = (sale) => {
//     setViewSale(sale);
//     setIsViewDialogOpen(true);
//   };

//   const updateStatusMutation = useMutation({
//     mutationFn: ({ saleId, status }) => {
//       return apiRequest("PATCH", `/api/sales/${saleId}/status`, { status });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["/api/sales"] });
//       toast({
//         title: "Status updated",
//         description: "Sale status has been updated successfully",
//       });
//       setIsViewDialogOpen(false);
//     },
//     onError: (error) => {
//       toast({
//         title: "Failed to update status",
//         description: error.message,
//         variant: "destructive",
//       });
//     },
//   });

//   const handleStatusChange = (saleId, status) => {
//     updateStatusMutation.mutate({ saleId, status });
//   };

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

//   return (
//     <div className="px-4 py-6 sm:px-6 lg:px-8">
//       <Card className="bg-white shadow">
//         <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 pb-4">
//           <div>
//             <CardTitle className="text-xl font-semibold text-[#264653]">Sales Management</CardTitle>
//             <p className="text-sm text-gray-500 mt-1">View and manage all sales transactions</p>
//           </div>
          
//           <div className="flex space-x-2">
//             <Button variant="outline" className="flex items-center gap-2">
//               <Calendar className="h-4 w-4" />
//               <span>Date Range</span>
//               <ArrowDown className="h-3 w-3 ml-1" />
//             </Button>
            
//             <Button 
//               variant="outline" 
//               className="flex items-center gap-2"
//               onClick={() => {
//                 toast({
//                   title: "Report downloaded",
//                   description: "Sales report has been downloaded successfully",
//                 });
//               }}
//             >
//               <Download className="h-4 w-4" />
//               <span>Export</span>
//             </Button>
//           </div>
//         </CardHeader>
        
//         <CardContent>
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
//               <Input
//                 placeholder="Search by order ID or customer name..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
            
//             <div className="w-full sm:w-48">
//               <Select
//                 value={statusFilter}
//                 onValueChange={(value) => setStatusFilter(value)}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Filter by status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Statuses</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="paid">Paid</SelectItem>
//                   <SelectItem value="failed">Failed</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
          
//           <div className="overflow-x-auto">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Order ID</TableHead>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Items</TableHead>
//                   <TableHead className="text-right">Total</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {isLoading ? (
//                   <TableRow>
//                     <TableCell colSpan={7} className="text-center py-10">
//                       <div className="flex justify-center">
//                         <div className="animate-spin h-8 w-8 border-4 border-[#2A9D8F] border-t-transparent rounded-full"></div>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ) : filteredSales?.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} className="text-center py-10 text-gray-500">
//                       No sales found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredSales?.map((sale) => (
//                     <TableRow key={sale.id}>
//                       <TableCell className="font-medium">#{sale.id}</TableCell>
//                       <TableCell>{sale.customerName}</TableCell>
//                       <TableCell>{formatDate(sale.date)}</TableCell>
//                       <TableCell>
//                         <div className="flex items-center">
//                           <ShoppingBag className="h-4 w-4 mr-2 text-[#2A9D8F]" />
//                           <span>{sale.items.length} item{sale.items.length !== 1 && 's'}</span>
//                         </div>
//                       </TableCell>
//                       <TableCell className="text-right font-medium">
//                         ${sale.total.toFixed(2)}
//                       </TableCell>
//                       <TableCell>
//                         <Badge variant="outline" className={`${statusBadgeVariant(sale.status)} px-2 py-1 rounded-full text-xs`}>
//                           {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
//                         </Badge>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => handleViewSale(sale)}
//                           className="text-[#2A9D8F] hover:text-[#1E7268] hover:bg-[#F4F1DE]"
//                         >
//                           <Eye className="h-4 w-4 mr-1" />
//                           View
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* View Sale Dialog */}
//       <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
//         <DialogContent className="sm:max-w-[600px]">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-semibold text-[#264653]">
//               Order #{viewSale?.id}
//             </DialogTitle>
//           </DialogHeader>
          
//           {viewSale && (
//             <div className="space-y-6">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <p className="text-sm text-gray-500">Customer:</p>
//                   <p className="font-medium">{viewSale.customerName}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Date:</p>
//                   <p className="font-medium">{formatDate(viewSale.date)}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Status:</p>
//                   <Select
//                     value={viewSale.status}
//                     onValueChange={(value) => handleStatusChange(viewSale.id, value)}
//                     disabled={updateStatusMutation.isPending}
//                   >
//                     <SelectTrigger className={`w-28 h-8 text-xs ${statusBadgeVariant(viewSale.status)}`}>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="pending">Pending</SelectItem>
//                       <SelectItem value="paid">Paid</SelectItem>
//                       <SelectItem value="failed">Failed</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
              
//               <Separator />
              
//               <div>
//                 <h3 className="font-medium mb-3 text-[#264653]">Items</h3>
//                 <div className="space-y-3">
//                   {viewSale.items.map((item, index) => (
//                     <div key={index} className="flex justify-between items-center">
//                       <div className="flex items-center">
//                         <div className="h-10 w-10 rounded bg-[#F4F1DE] flex items-center justify-center mr-3">
//                           <ShoppingBag className="h-5 w-5 text-[#264653]" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-[#264653]">{item.productName}</p>
//                           <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-medium">${item.price.toFixed(2)}</p>
//                         <p className="text-xs text-gray-500">
//                           ${(item.price * item.quantity).toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <Separator />
              
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <p className="text-gray-500">Subtotal</p>
//                   <p className="font-medium">${viewSale.subtotal.toFixed(2)}</p>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <p className="text-gray-500">Tax</p>
//                   <p className="font-medium">${viewSale.tax.toFixed(2)}</p>
//                 </div>
                
//                 <Separator />
                
//                 <div className="flex justify-between">
//                   <p className="font-medium">Total</p>
//                   <p className="font-medium text-lg">${viewSale.total.toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";
import { 
  ShoppingBag, 
  Search, 
  Calendar, 
  ArrowDown, 
  Eye, 
  Download 
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/Table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "../components/ui/Dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/Select";
import { Badge } from "../components/ui/Badge";
import { Separator } from "../components/ui/Seperator";
import { Link } from "wouter";

export default function Sales() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewSale, setViewSale] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const { data: sales, isLoading } = useQuery({
    queryKey: ["/api/sales"],
  });

  const filteredSales = sales?.filter((sale) => {
    const saleId = sale._id || sale.id;
    const matchesSearch =
      saleId.toString().includes(searchQuery) ||
      sale.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Added handleViewSale to set sale for viewing
  const handleViewSale = (sale) => {
    setViewSale(sale);
    setIsViewDialogOpen(true);
  };

  const updateStatusMutation = useMutation({
    mutationFn: ({ saleId, status }) =>
      apiRequest("PATCH", `/api/sales/${saleId}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sales"] });
      toast({
        title: "Status updated",
        description: "Sale status has been updated successfully",
      });
      setIsViewDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to update status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (saleId, status) => {
    updateStatusMutation.mutate({ saleId, status });
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

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <Card className="bg-white shadow">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-semibold text-[#264653]">Sales Management</CardTitle>
            <p className="text-sm text-gray-500 mt-1">View and manage all sales transactions</p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
              <ArrowDown className="h-3 w-3 ml-1" />
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                toast({
                  title: "Report downloaded",
                  description: "Sales report has been downloaded successfully",
                });
              }}
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search by order ID or customer name..."
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
                  <SelectValue placeholder="Filter by status" />
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
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <div className="flex justify-center">
                        <div className="animate-spin h-8 w-8 border-4 border-[#2A9D8F] border-t-transparent rounded-full"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredSales?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      No sales found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSales?.map((sale) => {
                    const saleId = sale._id || sale.id;
                    return (
                      <TableRow key={saleId}>
                        <TableCell className="font-medium">#{saleId}</TableCell>
                        <TableCell>{sale.customerName}</TableCell>
                        <TableCell>{formatDate(sale.date)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <ShoppingBag className="h-4 w-4 mr-2 text-[#2A9D8F]" />
                            <span>{sale.items.length} item{sale.items.length !== 1 && "s"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${parseFloat(sale.total).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`${statusBadgeVariant(sale.status)} px-2 py-1 rounded-full text-xs`}>
                            {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewSale(sale)}
                            className="text-[#2A9D8F] hover:text-[#1E7268] hover:bg-[#F4F1DE]"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="pt-3 border-t border-gray-200 flex justify-center">
          <Link href="/sales" className="text-[#2A9D8F] text-sm font-medium hover:text-[#1E7268]">
            View all transactions
          </Link>
        </CardFooter>
      </Card>

      {/* View Sale Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#264653]">
              Order #{viewSale ? (viewSale._id || viewSale.id) : ""}
            </DialogTitle>
          </DialogHeader>
          
          {viewSale && (
            <div className="space-y-6 bg-gray-100 text-gray-900 p-6 rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm">Customer:</p>
                  <p className="font-medium">{viewSale.customerName}</p>
                </div>
                <div>
                  <p className="text-sm">Date:</p>
                  <p className="font-medium">{formatDate(viewSale.date)}</p>
                </div>
                <div>
                  <p className="text-sm">Status:</p>
                  <Select
                    value={viewSale.status}
                    onValueChange={(value) =>
                      handleStatusChange(viewSale._id || viewSale.id, value)
                    }
                    disabled={updateStatusMutation?.isPending}
                  >
                    <SelectTrigger className={`w-28 h-8 text-xs ${statusBadgeVariant(viewSale.status)}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Items</h3>
                <div className="space-y-3">
                  {viewSale.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center mr-3">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-xs">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${parseFloat(item.price).toFixed(2)}</p>
                        <p className="text-xs">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-sm">Subtotal</p>
                  <p className="font-medium">${parseFloat(viewSale.subtotal).toFixed(2)}</p>
                </div>
                
                <div className="flex justify-between">
                  <p className="text-sm">Tax</p>
                  <p className="font-medium">${parseFloat(viewSale.tax).toFixed(2)}</p>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-medium text-lg">${parseFloat(viewSale.total).toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
