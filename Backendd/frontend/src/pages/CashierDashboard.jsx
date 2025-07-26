// // // import { useState, useEffect } from "react";
// // // import { useLocation } from "wouter";
// // // import { useQuery, useMutation } from "@tanstack/react-query";
// // // import { apiRequest, queryClient } from "../lib/queryClient";
// // // import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/Card";
// // // import { Button } from "../components/ui/Button";
// // // import { Input } from "../components/ui/Input"
// // // import { Label } from "../components/ui/Label";
// // // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
// // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/Dialog";
// // // import { Badge } from "../components/ui/Badge";
// // // import { Trash2, PlusCircle, Printer, LogOut, Search } from "lucide-react";
// // // import { useToast } from "../hooks/use-toast";
// // // import { useAppContext } from "../context/AppContext";

// // // export default function CashierDashboard() {
// // //   const [, navigate] = useLocation();
// // //   const { user, logout } = useAppContext();
// // //   const { toast } = useToast();
// // //   const [cart, setCart] = useState([]);
// // //   const [customerName, setCustomerName] = useState("");
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [receiptVisible, setReceiptVisible] = useState(false);
// // //   const [currentSale, setCurrentSale] = useState(null);

// // //   // Redirect if not logged in
// // //   useEffect(() => {
// // //     if (!user) {
// // //       navigate("/cashier-login");
// // //     }
// // //   }, [user, navigate]);

// // //   // Fetch products
// // //   const { data: products, isLoading } = useQuery({
// // //     queryKey: ["/api/products"],
// // //     queryFn: () => apiRequest("GET", "/api/products").then(res => res.json()),
// // //   });

// // //   // Filter products based on search query
// // //   const filteredProducts = products?.filter(product => 
// // //     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //     product.category.toLowerCase().includes(searchQuery.toLowerCase())
// // //   );

// // //   // Create sale mutation
// // //   const createSaleMutation = useMutation({
// // //     mutationFn: (saleData) => apiRequest("POST", "/api/sales", saleData).then(res => res.json()),
// // //     onSuccess: (data) => {
// // //       queryClient.invalidateQueries({ queryKey: ["/api/sales"] });
// // //       setCurrentSale(data);
// // //       setReceiptVisible(true);
// // //       setCart([]);
// // //       setCustomerName("");
// // //       toast({
// // //         title: "Sale completed",
// // //         description: `Sale #${data.id} has been created successfully.`,
// // //       });
// // //     },
// // //     onError: (error) => {
// // //       toast({
// // //         title: "Error creating sale",
// // //         description: error.message || "Failed to complete the sale.",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   });

// // //   const addToCart = (product) => {
// // //     // Use _id if available; otherwise fallback to id.
// // //     const productId = product._id || product.id;
// // //     const existingItemIndex = cart.findIndex(item => item.productId === productId);
    
// // //     if (existingItemIndex !== -1) {
// // //       // Update quantity if already in cart
// // //       const updatedCart = [...cart];
// // //       updatedCart[existingItemIndex].quantity += 1;
// // //       setCart(updatedCart);
// // //     } else {
// // //       // Add new item to cart
// // //       setCart([...cart, {
// // //         productId, // updated here
// // //         name: product.name,
// // //         price: parseFloat(product.price),
// // //         quantity: 1
// // //       }]);
// // //     }
    
// // //     toast({
// // //       title: "Item added",
// // //       description: `${product.name} added to cart.`,
// // //     });
// // //   };
  

// // //   const removeFromCart = (index) => {
// // //     const updatedCart = [...cart];
// // //     updatedCart.splice(index, 1);
// // //     setCart(updatedCart);
// // //   };

// // //   const updateQuantity = (index, newQuantity) => {
// // //     if (newQuantity > 0) {
// // //       const updatedCart = [...cart];
// // //       updatedCart[index].quantity = newQuantity;
// // //       setCart(updatedCart);
// // //     }
// // //   };

// // //   const calculateSubtotal = () => {
// // //     return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
// // //   };

// // //   const calculateTax = () => {
// // //     return calculateSubtotal() * 0.05; // 5% tax
// // //   };

// // //   const calculateTotal = () => {
// // //     return calculateSubtotal() + calculateTax();
// // //   };

// // //   const handleCheckout = () => {
// // //     if (cart.length === 0) {
// // //       toast({
// // //         title: "Empty cart",
// // //         description: "Please add items to the cart before checkout.",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     if (!customerName.trim()) {
// // //       toast({
// // //         title: "Customer name required",
// // //         description: "Please enter customer name before checkout.",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     const saleData = {
// // //       customerName,
// // //       status: "paid",
// // //       items: cart.map(item => ({
// // //         productId: item.productId,
// // //         quantity: item.quantity,
// // //         price: item.price.toString()
// // //       })),
// // //       subtotal: calculateSubtotal().toFixed(2),
// // //       tax: calculateTax().toFixed(2),
// // //       total: calculateTotal().toFixed(2),
// // //       notes: "Sale created by cashier"
// // //     };

// // //     createSaleMutation.mutate(saleData);
// // //   };

// // //   const handlePrintReceipt = () => {
// // //     // In a real app, this would trigger actual printing
// // //     toast({
// // //       title: "Printing receipt",
// // //       description: "Receipt has been sent to the printer.",
// // //     });
// // //     setReceiptVisible(false);
// // //   };

// // //   const handleLogout = () => {
// // //     logout();
// // //     navigate("/");
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex flex-col bg-gray-50">
// // //       <header className="bg-[#E9C46A] py-4 px-6 shadow-md">
// // //         <div className="flex justify-between items-center">
// // //           <h1 className="text-2xl font-bold text-white">Cashier Dashboard</h1>
// // //           <div className="flex items-center space-x-4">
// // //             <span className="text-white">Welcome, {user?.name || "Cashier"}</span>
// // //             <Button variant="ghost" className="text-white" onClick={handleLogout}>
// // //               <LogOut className="h-5 w-5 mr-2" />
// // //               Logout
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <main className="flex-1 container mx-auto py-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //         {/* Product Selection Section */}
// // //         <div className="lg:col-span-2">
// // //           <Card className="h-full">
// // //             <CardHeader className="pb-2">
// // //               <CardTitle>Products</CardTitle>
// // //               <div className="relative mt-2">
// // //                 <Input
// // //                   placeholder="Search products..."
// // //                   value={searchQuery}
// // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // //                   className="pl-10"
// // //                 />
// // //                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
// // //               </div>
// // //             </CardHeader>
// // //             <CardContent className="h-[calc(100%-130px)] overflow-auto">
// // //               {isLoading ? (
// // //                 <div className="flex justify-center items-center h-64">
// // //                   <div className="animate-spin h-8 w-8 border-4 border-[#E9C46A] border-t-transparent rounded-full"></div>
// // //                 </div>
// // //               ) : (
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
// // //                   {filteredProducts?.map((product) => (
// // //                     <Card key={product.id} className="hover:shadow-md transition-shadow">
// // //                       <CardContent className="p-4">
// // //                         <div className="flex flex-col h-full">
// // //                           <div className="h-40 bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
// // //                             {product.imageUrl ? (
// // //                               <img 
// // //                                 src={product.imageUrl} 
// // //                                 alt={product.name} 
// // //                                 className="w-full h-full object-cover"
// // //                               />
// // //                             ) : (
// // //                               <div className="text-gray-400 text-sm">No image</div>
// // //                             )}
// // //                           </div>
// // //                           <div className="flex-1">
// // //                             <h3 className="font-medium text-[#264653]">{product.name}</h3>
// // //                             <div className="flex items-center justify-between mt-1">
// // //                               <Badge variant="outline" className="text-xs">
// // //                                 {product.category}
// // //                               </Badge>
// // //                               <span className="font-semibold text-[#2A9D8F]">
// // //                                 ${parseFloat(product.price).toFixed(2)}
// // //                               </span>
// // //                             </div>
// // //                             <div className="mt-2 text-sm text-gray-500">
// // //                               {product.stock > 0 ? (
// // //                                 <span>In stock: {product.stock}</span>
// // //                               ) : (
// // //                                 <span className="text-red-500">Out of stock</span>
// // //                               )}
// // //                             </div>
// // //                           </div>
// // //                           <Button 
// // //                             className="w-full mt-3 bg-[#E9C46A] hover:bg-[#D9B45A]"
// // //                             onClick={() => addToCart(product)}
// // //                             disabled={product.stock <= 0}
// // //                           >
// // //                             <PlusCircle className="h-4 w-4 mr-2" />
// // //                             Add to Bill
// // //                           </Button>
// // //                         </div>
// // //                       </CardContent>
// // //                     </Card>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </CardContent>
// // //           </Card>
// // //         </div>

// // //         {/* Cart and Checkout Section */}
// // //         <div>
// // //           <Card className="h-full">
// // //             <CardHeader className="pb-2">
// // //               <CardTitle>Current Bill</CardTitle>
// // //               <div className="mt-2">
// // //                 <Label htmlFor="customerName">Customer Name</Label>
// // //                 <Input
// // //                   id="customerName"
// // //                   placeholder="Enter customer name"
// // //                   value={customerName}
// // //                   onChange={(e) => setCustomerName(e.target.value)}
// // //                   className="mt-1"
// // //                 />
// // //               </div>
// // //             </CardHeader>
// // //             <CardContent className="h-[calc(100%-280px)] overflow-auto">
// // //               {cart.length === 0 ? (
// // //                 <div className="text-center py-8 text-gray-500">
// // //                   No items added to the bill yet
// // //                 </div>
// // //               ) : (
// // //                 <Table>
// // //                   <TableHeader>
// // //                     <TableRow>
// // //                       <TableHead>Item</TableHead>
// // //                       <TableHead className="text-right">Qty</TableHead>
// // //                       <TableHead className="text-right">Price</TableHead>
// // //                       <TableHead className="text-right">Total</TableHead>
// // //                       <TableHead></TableHead>
// // //                     </TableRow>
// // //                   </TableHeader>
// // //                   <TableBody>
// // //                     {cart.map((item, index) => (
// // //                       <TableRow key={index}>
// // //                         <TableCell className="font-medium">{item.name}</TableCell>
// // //                         <TableCell className="text-right">
// // //                           <div className="flex items-center justify-end">
// // //                             <Button
// // //                               variant="ghost"
// // //                               size="sm"
// // //                               className="h-8 w-8 p-0"
// // //                               onClick={() => updateQuantity(index, item.quantity - 1)}
// // //                             >
// // //                               -
// // //                             </Button>
// // //                             <span className="w-8 text-center">{item.quantity}</span>
// // //                             <Button
// // //                               variant="ghost"
// // //                               size="sm"
// // //                               className="h-8 w-8 p-0"
// // //                               onClick={() => updateQuantity(index, item.quantity + 1)}
// // //                             >
// // //                               +
// // //                             </Button>
// // //                           </div>
// // //                         </TableCell>
// // //                         <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
// // //                         <TableCell className="text-right">
// // //                           ${(item.price * item.quantity).toFixed(2)}
// // //                         </TableCell>
// // //                         <TableCell>
// // //                           <Button
// // //                             variant="ghost"
// // //                             size="icon"
// // //                             className="h-8 w-8 text-red-500"
// // //                             onClick={() => removeFromCart(index)}
// // //                           >
// // //                             <Trash2 className="h-4 w-4" />
// // //                           </Button>
// // //                         </TableCell>
// // //                       </TableRow>
// // //                     ))}
// // //                   </TableBody>
// // //                 </Table>
// // //               )}
// // //             </CardContent>
// // //             <CardFooter className="flex-col border-t pt-6">
// // //               <div className="w-full space-y-2">
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-500">Subtotal:</span>
// // //                   <span>${calculateSubtotal().toFixed(2)}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span className="text-gray-500">Tax (5%):</span>
// // //                   <span>${calculateTax().toFixed(2)}</span>
// // //                 </div>
// // //                 <div className="flex justify-between font-semibold text-lg">
// // //                   <span>Total:</span>
// // //                   <span>${calculateTotal().toFixed(2)}</span>
// // //                 </div>
// // //               </div>
// // //               <Button
// // //                 className="w-full mt-4 bg-[#2A9D8F] hover:bg-[#1E7268]"
// // //                 onClick={handleCheckout}
// // //                 disabled={cart.length === 0 || createSaleMutation.isPending}
// // //               >
// // //                 {createSaleMutation.isPending ? (
// // //                   <div className="flex items-center">
// // //                     <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
// // //                     Processing...
// // //                   </div>
// // //                 ) : (
// // //                   "Complete Sale"
// // //                 )}
// // //               </Button>
// // //             </CardFooter>
// // //           </Card>
// // //         </div>
// // //       </main>

// // //       {/* Receipt Dialog */}
// // //       <Dialog open={receiptVisible} onOpenChange={setReceiptVisible}>
// // //         <DialogContent className="sm:max-w-md">
// // //           <DialogHeader>
// // //             <DialogTitle>Sale Receipt</DialogTitle>
// // //           </DialogHeader>
          
// // //           {currentSale && (
// // //             <div className="bg-white p-4 rounded-md">
// // //               <div className="text-center mb-4">
// // //                 <h2 className="font-bold text-xl">Jungle Safari Souvenir Shop</h2>
// // //                 <p className="text-gray-500">Receipt #{currentSale.id}</p>
// // //                 <p className="text-gray-500">{new Date().toLocaleString()}</p>
// // //               </div>
              
// // //               <div className="mb-4">
// // //                 <p><strong>Customer:</strong> {currentSale.customerName}</p>
// // //                 <p><strong>Status:</strong> <Badge>{currentSale.status}</Badge></p>
// // //               </div>
              
// // //               <table className="w-full mb-4">
// // //                 <thead className="border-b">
// // //                   <tr>
// // //                     <th className="text-left py-2">Item</th>
// // //                     <th className="text-center py-2">Qty</th>
// // //                     <th className="text-right py-2">Price</th>
// // //                     <th className="text-right py-2">Total</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {currentSale.items.map((item, index) => (
// // //                     <tr key={index} className="border-b border-gray-100">
// // //                       <td className="py-2">{item.name}</td>
// // //                       <td className="text-center py-2">{item.quantity}</td>
// // //                       <td className="text-right py-2">${parseFloat(item.price).toFixed(2)}</td>
// // //                       <td className="text-right py-2">
// // //                         ${(parseFloat(item.price) * item.quantity).toFixed(2)}
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
              
// // //               <div className="space-y-1 border-t pt-2">
// // //                 <div className="flex justify-between">
// // //                   <span>Subtotal:</span>
// // //                   <span>${parseFloat(currentSale.subtotal).toFixed(2)}</span>
// // //                 </div>
// // //                 <div className="flex justify-between">
// // //                   <span>Tax:</span>
// // //                   <span>${parseFloat(currentSale.tax).toFixed(2)}</span>
// // //                 </div>
// // //                 <div className="flex justify-between font-bold text-lg pt-1 border-t">
// // //                   <span>Total:</span>
// // //                   <span>${parseFloat(currentSale.total).toFixed(2)}</span>
// // //                 </div>
// // //               </div>
              
// // //               <div className="mt-6 text-center text-gray-500 text-sm">
// // //                 <p>Thank you for shopping with us!</p>
// // //                 <p>Please visit again soon.</p>
// // //               </div>
// // //             </div>
// // //           )}
          
// // //           <div className="flex justify-end mt-4">
// // //             <Button onClick={handlePrintReceipt} className="bg-[#2A9D8F]">
// // //               <Printer className="mr-2 h-4 w-4" />
// // //               Print Receipt
// // //             </Button>
// // //           </div>
// // //         </DialogContent>
// // //       </Dialog>
// // //     </div>
// // //   );
// // // }




// // import { useState, useEffect } from "react";
// // import { useLocation } from "wouter";
// // import { useQuery, useMutation } from "@tanstack/react-query";
// // import { apiRequest, queryClient } from "../lib/queryClient";
// // import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/Card";
// // import { Button } from "../components/ui/Button";
// // import { Input } from "../components/ui/Input";
// // import { Label } from "../components/ui/Label";
// // import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/Dialog";
// // import { Badge } from "../components/ui/Badge";
// // import { Trash2, PlusCircle, Printer, LogOut, Search } from "lucide-react";
// // import { useToast } from "../hooks/use-toast";
// // import { useAppContext } from "../context/AppContext";

// // export default function CashierDashboard() {
// //   const [, navigate] = useLocation();
// //   const { user, logout } = useAppContext();
// //   const { toast } = useToast();
// //   const [cart, setCart] = useState([]);
// //   const [customerName, setCustomerName] = useState("");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [receiptVisible, setReceiptVisible] = useState(false);
// //   const [currentSale, setCurrentSale] = useState(null);

// //   // Redirect if not logged in
// //   useEffect(() => {
// //     if (!user) {
// //       navigate("/cashier-login");
// //     }
// //   }, [user, navigate]);

// //   // Fetch products
// //   const { data: products, isLoading } = useQuery({
// //     queryKey: ["/api/products"],
// //     queryFn: () => apiRequest("GET", "/api/products").then(res => res.json()),
// //   });

// //   // Filter products based on search query
// //   const filteredProducts = products?.filter(product => 
// //     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //     product.category.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   // Create sale mutation
// //   const createSaleMutation = useMutation({
// //     mutationFn: (saleData) => apiRequest("POST", "/api/sales", saleData).then(res => res.json()),
// //     onSuccess: (data) => {
// //       queryClient.invalidateQueries({ queryKey: ["/api/sales"] });
// //       setCurrentSale(data);
// //       setReceiptVisible(true);
// //       setCart([]);
// //       setCustomerName("");
// //       toast({
// //         title: "Sale completed",
// //         description: `Sale #${data.id} has been created successfully.`,
// //       });
// //     },
// //     onError: (error) => {
// //       toast({
// //         title: "Error creating sale",
// //         description: error.message || "Failed to complete the sale.",
// //         variant: "destructive",
// //       });
// //     }
// //   });

// //   const addToCart = (product) => {
// //     // Use _id if available; otherwise fallback to id.
// //     const productId = product._id || product.id;
// //     const existingItemIndex = cart.findIndex(item => item.productId === productId);
    
// //     if (existingItemIndex !== -1) {
// //       // Update quantity if already in cart
// //       const updatedCart = [...cart];
// //       updatedCart[existingItemIndex].quantity += 1;
// //       setCart(updatedCart);
// //     } else {
// //       // Add new item to cart
// //       setCart([...cart, {
// //         productId, // updated here
// //         name: product.name,
// //         price: parseFloat(product.price),
// //         quantity: 1
// //       }]);
// //     }
    
// //     toast({
// //       title: "Item added",
// //       description: `${product.name} added to cart.`,
// //     });
// //   };
  
// //   const removeFromCart = (index) => {
// //     const updatedCart = [...cart];
// //     updatedCart.splice(index, 1);
// //     setCart(updatedCart);
// //   };

// //   const updateQuantity = (index, newQuantity) => {
// //     if (newQuantity > 0) {
// //       const updatedCart = [...cart];
// //       updatedCart[index].quantity = newQuantity;
// //       setCart(updatedCart);
// //     }
// //   };

// //   const calculateSubtotal = () => {
// //     return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
// //   };

// //   const calculateTax = () => {
// //     return calculateSubtotal() * 0.05; // 5% tax
// //   };

// //   const calculateTotal = () => {
// //     return calculateSubtotal() + calculateTax();
// //   };

// //   const handleCheckout = () => {
// //     if (cart.length === 0) {
// //       toast({
// //         title: "Empty cart",
// //         description: "Please add items to the cart before checkout.",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     if (!customerName.trim()) {
// //       toast({
// //         title: "Customer name required",
// //         description: "Please enter customer name before checkout.",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     const saleData = {
// //       customerName,
// //       status: "paid",
// //       items: cart.map(item => ({
// //         productId: item.productId,
// //         productName: item.name, // Added productName field
// //         quantity: item.quantity,
// //         price: parseFloat(item.price.toFixed(2))
// //       })),
// //       subtotal: parseFloat(calculateSubtotal().toFixed(2)),
// //       tax: parseFloat(calculateTax().toFixed(2)),
// //       total: parseFloat(calculateTotal().toFixed(2)),
// //       notes: "Sale created by cashier"
// //     };

// //     createSaleMutation.mutate(saleData);
// //   };

// //   const handlePrintReceipt = () => {
// //     // In a real app, this would trigger actual printing
// //     toast({
// //       title: "Printing receipt",
// //       description: "Receipt has been sent to the printer.",
// //     });
// //     setReceiptVisible(false);
// //   };

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/");
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col bg-gray-50">
// //       <header className="bg-[#E9C46A] py-4 px-6 shadow-md">
// //         <div className="flex justify-between items-center">
// //           <h1 className="text-2xl font-bold text-white">Cashier Dashboard</h1>
// //           <div className="flex items-center space-x-4">
// //             <span className="text-white">Welcome, {user?.name || "Cashier"}</span>
// //             <Button variant="ghost" className="text-white" onClick={handleLogout}>
// //               <LogOut className="h-5 w-5 mr-2" />
// //               Logout
// //             </Button>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="flex-1 container mx-auto py-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* Product Selection Section */}
// //         <div className="lg:col-span-2">
// //           <Card className="h-full">
// //             <CardHeader className="pb-2">
// //               <CardTitle>Products</CardTitle>
// //               <div className="relative mt-2">
// //                 <Input
// //                   placeholder="Search products..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   className="pl-10"
// //                 />
// //                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
// //               </div>
// //             </CardHeader>
// //             <CardContent className="h-[calc(100%-130px)] overflow-auto">
// //               {isLoading ? (
// //                 <div className="flex justify-center items-center h-64">
// //                   <div className="animate-spin h-8 w-8 border-4 border-[#E9C46A] border-t-transparent rounded-full"></div>
// //                 </div>
// //               ) : (
// //                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
// //                   {filteredProducts?.map((product) => (
// //                     <Card key={product.id} className="hover:shadow-md transition-shadow">
// //                       <CardContent className="p-4">
// //                         <div className="flex flex-col h-full">
// //                           <div className="h-40 bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
// //                             {product.imageUrl ? (
// //                               <img 
// //                                 src={product.imageUrl} 
// //                                 alt={product.name} 
// //                                 className="w-full h-full object-cover"
// //                               />
// //                             ) : (
// //                               <div className="text-gray-400 text-sm">No image</div>
// //                             )}
// //                           </div>
// //                           <div className="flex-1">
// //                             <h3 className="font-medium text-[#264653]">{product.name}</h3>
// //                             <div className="flex items-center justify-between mt-1">
// //                               <Badge variant="outline" className="text-xs">
// //                                 {product.category}
// //                               </Badge>
// //                               <span className="font-semibold text-[#2A9D8F]">
// //                                 ${parseFloat(product.price).toFixed(2)}
// //                               </span>
// //                             </div>
// //                             <div className="mt-2 text-sm text-gray-500">
// //                               {product.stock > 0 ? (
// //                                 <span>In stock: {product.stock}</span>
// //                               ) : (
// //                                 <span className="text-red-500">Out of stock</span>
// //                               )}
// //                             </div>
// //                           </div>
// //                           <Button 
// //                             className="w-full mt-3 bg-[#E9C46A] hover:bg-[#D9B45A]"
// //                             onClick={() => addToCart(product)}
// //                             disabled={product.stock <= 0}
// //                           >
// //                             <PlusCircle className="h-4 w-4 mr-2" />
// //                             Add to Bill
// //                           </Button>
// //                         </div>
// //                       </CardContent>
// //                     </Card>
// //                   ))}
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Cart and Checkout Section */}
// //         <div>
// //           <Card className="h-full">
// //             <CardHeader className="pb-2">
// //               <CardTitle>Current Bill</CardTitle>
// //               <div className="mt-2">
// //                 <Label htmlFor="customerName">Customer Name</Label>
// //                 <Input
// //                   id="customerName"
// //                   placeholder="Enter customer name"
// //                   value={customerName}
// //                   onChange={(e) => setCustomerName(e.target.value)}
// //                   className="mt-1"
// //                 />
// //               </div>
// //             </CardHeader>
// //             <CardContent className="h-[calc(100%-280px)] overflow-auto">
// //               {cart.length === 0 ? (
// //                 <div className="text-center py-8 text-gray-500">
// //                   No items added to the bill yet
// //                 </div>
// //               ) : (
// //                 <Table>
// //                   <TableHeader>
// //                     <TableRow>
// //                       <TableHead>Item</TableHead>
// //                       <TableHead className="text-right">Qty</TableHead>
// //                       <TableHead className="text-right">Price</TableHead>
// //                       <TableHead className="text-right">Total</TableHead>
// //                       <TableHead></TableHead>
// //                     </TableRow>
// //                   </TableHeader>
// //                   <TableBody>
// //                     {cart.map((item, index) => (
// //                       <TableRow key={index}>
// //                         <TableCell className="font-medium">{item.name}</TableCell>
// //                         <TableCell className="text-right">
// //                           <div className="flex items-center justify-end">
// //                             <Button
// //                               variant="ghost"
// //                               size="sm"
// //                               className="h-8 w-8 p-0"
// //                               onClick={() => updateQuantity(index, item.quantity - 1)}
// //                             >
// //                               -
// //                             </Button>
// //                             <span className="w-8 text-center">{item.quantity}</span>
// //                             <Button
// //                               variant="ghost"
// //                               size="sm"
// //                               className="h-8 w-8 p-0"
// //                               onClick={() => updateQuantity(index, item.quantity + 1)}
// //                             >
// //                               +
// //                             </Button>
// //                           </div>
// //                         </TableCell>
// //                         <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
// //                         <TableCell className="text-right">
// //                           ${(item.price * item.quantity).toFixed(2)}
// //                         </TableCell>
// //                         <TableCell>
// //                           <Button
// //                             variant="ghost"
// //                             size="icon"
// //                             className="h-8 w-8 text-red-500"
// //                             onClick={() => removeFromCart(index)}
// //                           >
// //                             <Trash2 className="h-4 w-4" />
// //                           </Button>
// //                         </TableCell>
// //                       </TableRow>
// //                     ))}
// //                   </TableBody>
// //                 </Table>
// //               )}
// //             </CardContent>
// //             <CardFooter className="flex-col border-t pt-6">
// //               <div className="w-full space-y-2">
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-500">Subtotal:</span>
// //                   <span>${calculateSubtotal().toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="text-gray-500">Tax (5%):</span>
// //                   <span>${calculateTax().toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between font-semibold text-lg">
// //                   <span>Total:</span>
// //                   <span>${calculateTotal().toFixed(2)}</span>
// //                 </div>
// //               </div>
// //               <Button
// //                 className="w-full mt-4 bg-[#2A9D8F] hover:bg-[#1E7268]"
// //                 onClick={handleCheckout}
// //                 disabled={cart.length === 0 || createSaleMutation.isPending}
// //               >
// //                 {createSaleMutation.isPending ? (
// //                   <div className="flex items-center">
// //                     <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
// //                     Processing...
// //                   </div>
// //                 ) : (
// //                   "Complete Sale"
// //                 )}
// //               </Button>
// //             </CardFooter>
// //           </Card>
// //         </div>
// //       </main>

// //       {/* Receipt Dialog */}
// //       <Dialog open={receiptVisible} onOpenChange={setReceiptVisible}>
// //         <DialogContent className="sm:max-w-md">
// //           <DialogHeader>
// //             <DialogTitle>Sale Receipt</DialogTitle>
// //           </DialogHeader>
          
// //           {currentSale && (
// //             <div className="bg-white p-4 rounded-md">
// //               <div className="text-center mb-4">
// //                 <h2 className="font-bold text-xl">Jungle Safari Souvenir Shop</h2>
// //                 <p className="text-gray-500">Receipt #{currentSale.id}</p>
// //                 <p className="text-gray-500">{new Date().toLocaleString()}</p>
// //               </div>
              
// //               <div className="mb-4">
// //                 <p><strong>Customer:</strong> {currentSale.customerName}</p>
// //                 <p><strong>Status:</strong> <Badge>{currentSale.status}</Badge></p>
// //               </div>
              
// //               <table className="w-full mb-4">
// //                 <thead className="border-b">
// //                   <tr>
// //                     <th className="text-left py-2">Item</th>
// //                     <th className="text-center py-2">Qty</th>
// //                     <th className="text-right py-2">Price</th>
// //                     <th className="text-right py-2">Total</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {currentSale.items.map((item, index) => (
// //                     <tr key={index} className="border-b border-gray-100">
// //                       <td className="py-2">{item.productName}</td>
// //                       <td className="text-center py-2">{item.quantity}</td>
// //                       <td className="text-right py-2">${parseFloat(item.price).toFixed(2)}</td>
// //                       <td className="text-right py-2">
// //                         ${(parseFloat(item.price) * item.quantity).toFixed(2)}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
              
// //               <div className="space-y-1 border-t pt-2">
// //                 <div className="flex justify-between">
// //                   <span>Subtotal:</span>
// //                   <span>${parseFloat(currentSale.subtotal).toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span>Tax:</span>
// //                   <span>${parseFloat(currentSale.tax).toFixed(2)}</span>
// //                 </div>
// //                 <div className="flex justify-between font-bold text-lg pt-1 border-t">
// //                   <span>Total:</span>
// //                   <span>${parseFloat(currentSale.total).toFixed(2)}</span>
// //                 </div>
// //               </div>
              
// //               <div className="mt-6 text-center text-gray-500 text-sm">
// //                 <p>Thank you for shopping with us!</p>
// //                 <p>Please visit again soon.</p>
// //               </div>
// //             </div>
// //           )}
          
// //           <div className="flex justify-end mt-4">
// //             <Button onClick={handlePrintReceipt} className="bg-[#2A9D8F]">
// //               <Printer className="mr-2 h-4 w-4" />
// //               Print Receipt
// //             </Button>
// //           </div>
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   );
// // }


// import { useState, useEffect, useRef } from "react";
// import { useLocation } from "wouter";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { apiRequest, queryClient } from "../lib/queryClient";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "../components/ui/Card";
// import { Button } from "../components/ui/Button";
// import { Input } from "../components/ui/Input";
// import { Label } from "../components/ui/Label";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../components/ui/Table";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog";
// import { Badge } from "../components/ui/Badge";
// import {
//   Trash2,
//   PlusCircle,
//   Printer,
//   LogOut,
//   Search,
//   Filter,
//   Home,
// } from "lucide-react";
// import { useToast } from "../hooks/use-toast";
// import { useAppContext } from "../context/AppContext";
// import { Html5Qrcode } from "html5-qrcode";

// export default function CashierDashboard() {
//   const [, navigate] = useLocation();
//   const { user, logout } = useAppContext();
//   const { toast } = useToast();
//   const [cart, setCart] = useState([]);
//   const [customerName, setCustomerName] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [receiptVisible, setReceiptVisible] = useState(false);
//   const [currentSale, setCurrentSale] = useState(null);
//   // Barcode scanning state and ref
//   const [isScanning, setIsScanning] = useState(false);
//   const readerRef = useRef(null);

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!user) {
//       navigate("/cashier-login");
//     }
//   }, [user, navigate]);

//   // Fetch products
//   const { data: products, isLoading } = useQuery({
//     queryKey: ["/api/products"],
//     queryFn: () =>
//       apiRequest("GET", "/api/products").then((res) => res.json()),
//   });

//   // Filter products based on search query
//   const filteredProducts = products?.filter(
//     (product) =>
//       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.category.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Create sale mutation
//   const createSaleMutation = useMutation({
//     mutationFn: (saleData) =>
//       apiRequest("POST", "/api/sales", saleData).then((res) => res.json()),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["/api/sales"] });
//       setCurrentSale(data);
//       setReceiptVisible(true);
//       setCart([]);
//       setCustomerName("");
//       toast({
//         title: "Sale completed",
//         description: `Sale #${data.id || data._id} has been created successfully.`,
//       });
//     },
//     onError: (error) => {
//       toast({
//         title: "Error creating sale",
//         description: error.message || "Failed to complete the sale.",
//         variant: "destructive",
//       });
//     },
//   });

//   const addToCart = (product) => {
//     const productId = product._id || product.id;
//     const existingItemIndex = cart.findIndex((item) => item.productId === productId);
//     if (existingItemIndex !== -1) {
//       const updatedCart = [...cart];
//       updatedCart[existingItemIndex].quantity += 1;
//       setCart(updatedCart);
//     } else {
//       setCart([
//         ...cart,
//         {
//           productId,
//           name: product.name,
//           price: parseFloat(product.price),
//           quantity: 1,
//         },
//       ]);
//     }
//     toast({
//       title: "Item added",
//       description: `${product.name} added to cart.`,
//     });
//   };

//   const removeFromCart = (index) => {
//     const updatedCart = [...cart];
//     updatedCart.splice(index, 1);
//     setCart(updatedCart);
//   };

//   const updateQuantity = (index, newQuantity) => {
//     if (newQuantity > 0) {
//       const updatedCart = [...cart];
//       updatedCart[index].quantity = newQuantity;
//       setCart(updatedCart);
//     }
//   };

//   const calculateSubtotal = () =>
//     cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   const calculateTax = () => calculateSubtotal() * 0.05;
//   const calculateTotal = () => calculateSubtotal() + calculateTax();

//   const handleCheckout = () => {
//     if (cart.length === 0) {
//       toast({
//         title: "Empty cart",
//         description: "Please add items to the cart before checkout.",
//         variant: "destructive",
//       });
//       return;
//     }
//     if (!customerName.trim()) {
//       toast({
//         title: "Customer name required",
//         description: "Please enter customer name before checkout.",
//         variant: "destructive",
//       });
//       return;
//     }
//     const saleData = {
//       customerName,
//       status: "paid",
//       items: cart.map((item) => ({
//         productId: item.productId,
//         productName: item.name,
//         quantity: item.quantity,
//         price: parseFloat(item.price.toFixed(2)),
//       })),
//       subtotal: parseFloat(calculateSubtotal().toFixed(2)),
//       tax: parseFloat(calculateTax().toFixed(2)),
//       total: parseFloat(calculateTotal().toFixed(2)),
//       notes: "Sale created by cashier",
//     };
//     createSaleMutation.mutate(saleData);
//   };

//   const handlePrintReceipt = () => {
//     toast({
//       title: "Printing receipt",
//       description: "Receipt has been sent to the printer.",
//     });
//     setReceiptVisible(false);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   // Barcode scanning functionality using Html5Qrcode with a delay for mounting
//   useEffect(() => {
//     let html5QrcodeScanner;
//     if (isScanning) {
//       setTimeout(() => {
//         if (!readerRef.current) {
//           console.error("Reader element not found");
//           toast({
//             title: "Scanner Error",
//             description: "Scanner element not found. Please try again.",
//             variant: "destructive",
//           });
//           setIsScanning(false);
//           return;
//         }
//         const config = { fps: 10, qrbox: 250 };
//         html5QrcodeScanner = new Html5Qrcode(readerRef.current.id);
//         html5QrcodeScanner
//           .start(
//             { facingMode: "environment" },
//             config,
//             (decodedText, decodedResult) => {
//               // Attempt to stop scanner; if error occurs, catch it but continue
//               html5QrcodeScanner
//                 .stop()
//                 .catch((err) => {
//                   console.warn("Stop error (ignored):", err);
//                 })
//                 .finally(() => {
//                   setIsScanning(false);
//                   // Fetch product by barcode
//                   apiRequest("GET", `/api/products/barcode/${decodedText}`)
//                     .then((res) => res.json())
//                     .then((product) => {
//                       if (product) {
//                         addToCart(product);
//                         toast({
//                           title: "Product Found",
//                           description: `${product.name} added to cart.`,
//                         });
//                       } else {
//                         toast({
//                           title: "Product Not Found",
//                           description: "No product matches the scanned barcode.",
//                           variant: "destructive",
//                         });
//                       }
//                     })
//                     .catch((error) => {
//                       toast({
//                         title: "Error",
//                         description: error.message || "Failed to fetch product.",
//                         variant: "destructive",
//                       });
//                     });
//                 });
//             },
//             (errorMessage) => {
//               console.log("Scan error:", errorMessage);
//             }
//           )
//           .catch((err) => {
//             console.error("Unable to start scanner", err);
//             toast({
//               title: "Scanner Error",
//               description: err.message || "Unable to start the scanner.",
//               variant: "destructive",
//             });
//             setIsScanning(false);
//           });
//       }, 500); // 500ms delay to ensure the reader element is mounted
//     }
//     return () => {
//       if (html5QrcodeScanner) {
//         html5QrcodeScanner.stop().catch((err) => {
//           if (err && err.message && err.message.includes("not running")) {
//             // Ignore this error
//           } else {
//             console.error("Cleanup stop error:", err);
//           }
//         });
//       }
//     };
//   }, [isScanning, toast]);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <header className="bg-[#E9C46A] py-4 px-6 shadow-md">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-white">Cashier Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <span className="text-white">Welcome, {user?.name || "Cashier"}</span>
//             <Button variant="ghost" className="text-white" onClick={handleLogout}>
//               <LogOut className="h-5 w-5 mr-2" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="flex-1 container mx-auto py-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Product Selection Section */}
//         <div className="lg:col-span-2">
//           <Card className="h-full">
//             <CardHeader className="pb-2">
//               <CardTitle>Products</CardTitle>
//               <div className="relative mt-2">
//                 <Input
//                   placeholder="Search products..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//               </div>
//               {/* Barcode scan button */}
//               <div className="mt-4">
//                 <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setIsScanning(true)}>
//                   Scan Barcode
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent className="h-[calc(100%-130px)] overflow-auto">
//               {isLoading ? (
//                 <div className="flex justify-center items-center h-64">
//                   <div className="animate-spin h-8 w-8 border-4 border-[#E9C46A] border-t-transparent rounded-full"></div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//                   {filteredProducts?.map((product) => (
//                     <Card key={product.id} className="hover:shadow-md transition-shadow">
//                       <CardContent className="p-4">
//                         <div className="flex flex-col h-full">
//                           <div className="h-40 bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
//                             {product.imageUrl ? (
//                               <img
//                                 src={product.imageUrl}
//                                 alt={product.name}
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <div className="text-gray-400 text-sm">No image</div>
//                             )}
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-medium text-[#264653]">{product.name}</h3>
//                             <div className="flex items-center justify-between mt-1">
//                               <Badge variant="outline" className="text-xs">
//                                 {product.category}
//                               </Badge>
//                               <span className="font-semibold text-[#2A9D8F]">
//                                 ${parseFloat(product.price).toFixed(2)}
//                               </span>
//                             </div>
//                             <div className="mt-2 text-sm text-gray-500">
//                               {product.stock > 0 ? (
//                                 <span>In stock: {product.stock}</span>
//                               ) : (
//                                 <span className="text-red-500">Out of stock</span>
//                               )}
//                             </div>
//                           </div>
//                           <Button
//                             className="w-full mt-3 bg-[#E9C46A] hover:bg-[#D9B45A]"
//                             onClick={() => addToCart(product)}
//                             disabled={product.stock <= 0}
//                           >
//                             <PlusCircle className="h-4 w-4 mr-2" />
//                             Add to Bill
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Cart and Checkout Section */}
//         <div>
//           <Card className="h-full">
//             <CardHeader className="pb-2">
//               <CardTitle>Current Bill</CardTitle>
//               <div className="mt-2">
//                 <Label htmlFor="customerName">Customer Name</Label>
//                 <Input
//                   id="customerName"
//                   placeholder="Enter customer name"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   className="mt-1"
//                 />
//               </div>
//             </CardHeader>
//             <CardContent className="h-[calc(100%-280px)] overflow-auto">
//               {cart.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">
//                   No items added to the bill yet
//                 </div>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Item</TableHead>
//                       <TableHead className="text-right">Qty</TableHead>
//                       <TableHead className="text-right">Price</TableHead>
//                       <TableHead className="text-right">Total</TableHead>
//                       <TableHead></TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {cart.map((item, index) => (
//                       <TableRow key={index}>
//                         <TableCell className="font-medium">{item.name}</TableCell>
//                         <TableCell className="text-right">
//                           <div className="flex items-center justify-end">
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-8 w-8 p-0"
//                               onClick={() => updateQuantity(index, item.quantity - 1)}
//                             >
//                               -
//                             </Button>
//                             <span className="w-8 text-center">{item.quantity}</span>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="h-8 w-8 p-0"
//                               onClick={() => updateQuantity(index, item.quantity + 1)}
//                             >
//                               +
//                             </Button>
//                           </div>
//                         </TableCell>
//                         <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
//                         <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
//                         <TableCell>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             className="h-8 w-8 text-red-500"
//                             onClick={() => removeFromCart(index)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//             </CardContent>
//             <CardFooter className="flex-col border-t pt-6">
//               <div className="w-full space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Subtotal:</span>
//                   <span>${calculateSubtotal().toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Tax (5%):</span>
//                   <span>${calculateTax().toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-semibold text-lg">
//                   <span>Total:</span>
//                   <span>${calculateTotal().toFixed(2)}</span>
//                 </div>
//               </div>
//               <Button
//                 className="w-full mt-4 bg-[#2A9D8F] hover:bg-[#1A7C68]"
//                 onClick={handleCheckout}
//                 disabled={cart.length === 0 || createSaleMutation.isPending}
//               >
//                 {createSaleMutation.isPending ? (
//                   <div className="flex items-center">
//                     <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
//                     Processing...
//                   </div>
//                 ) : (
//                   "Complete Sale"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       </main>

//       {/* Receipt Dialog */}
//       <Dialog open={receiptVisible} onOpenChange={setReceiptVisible}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Sale Receipt</DialogTitle>
//           </DialogHeader>
//           {currentSale && (
//             <div className="bg-white p-4 rounded-md">
//               <div className="text-center mb-4">
//                 <h2 className="font-bold text-xl">Jungle Safari Souvenir Shop</h2>
//                 <p className="text-gray-500">
//                   Receipt #{currentSale.id || currentSale._id}
//                 </p>
//                 <p className="text-gray-500">{new Date().toLocaleString()}</p>
//               </div>
//               <div className="mb-4">
//                 <p>
//                   <strong>Customer:</strong> {currentSale.customerName}
//                 </p>
//                 <p>
//                   <strong>Status:</strong> <Badge>{currentSale.status}</Badge>
//                 </p>
//               </div>
//               <table className="w-full mb-4">
//                 <thead className="border-b">
//                   <tr>
//                     <TableHead className="text-left py-2">Item</TableHead>
//                     <TableHead className="text-center py-2">Qty</TableHead>
//                     <TableHead className="text-right py-2">Price</TableHead>
//                     <TableHead className="text-right py-2">Total</TableHead>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentSale.items.map((item, index) => (
//                     <tr key={index} className="border-b border-gray-100">
//                       <TableCell className="py-2">{item.productName}</TableCell>
//                       <TableCell className="text-center py-2">{item.quantity}</TableCell>
//                       <TableCell className="text-right py-2">${parseFloat(item.price).toFixed(2)}</TableCell>
//                       <TableCell className="text-right py-2">
//                         ${(parseFloat(item.price) * item.quantity).toFixed(2)}
//                       </TableCell>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className="space-y-1 border-t pt-2">
//                 <div className="flex justify-between">
//                   <span>Subtotal:</span>
//                   <span>${parseFloat(currentSale.subtotal).toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Tax:</span>
//                   <span>${parseFloat(currentSale.tax).toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg pt-1 border-t">
//                   <span>Total:</span>
//                   <span>${parseFloat(currentSale.total).toFixed(2)}</span>
//                 </div>
//               </div>
//               <div className="mt-6 text-center text-gray-500 text-sm">
//                 <p>Thank you for shopping with us!</p>
//                 <p>Please visit again soon.</p>
//               </div>
//             </div>
//           )}
//           <div className="flex justify-end mt-4">
//             <Button onClick={handlePrintReceipt} className="bg-[#2A9D8F]">
//               <Printer className="mr-2 h-4 w-4" />
//               Print Receipt
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Barcode Scanner Dialog */}
//       {isScanning && (
//         <Dialog open={isScanning} onOpenChange={setIsScanning}>
//           <DialogContent className="sm:max-w-md">
//             <DialogHeader>
//               <DialogTitle>Scan Barcode</DialogTitle>
//             </DialogHeader>
//             {/* Reader element for the scanner */}
//             <div id="reader" ref={readerRef} style={{ width: "100%" }}></div>
//             <div className="flex justify-end mt-4">
//               <Button onClick={() => setIsScanning(false)} className="bg-red-500 hover:bg-red-600 text-white">
//                 Cancel
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog";
import { Badge } from "../components/ui/Badge";
import {
  Trash2,
  PlusCircle,
  Printer,
  LogOut,
  Search,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useAppContext } from "../context/AppContext";
import { Html5Qrcode } from "html5-qrcode";

export default function CashierDashboard() {
  const [, navigate] = useLocation();
  const { user, logout } = useAppContext();
  const { toast } = useToast();
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);
  // Barcode scanning state and ref
  const [isScanning, setIsScanning] = useState(false);
  const readerRef = useRef(null);
  const html5QrcodeScannerRef = useRef(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/cashier-login");
    }
  }, [user, navigate]);

  // Fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products"],
    queryFn: () =>
      apiRequest("GET", "/api/products").then((res) => res.json()),
  });

  // Filter products based on search query
  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Create sale mutation
  const createSaleMutation = useMutation({
    mutationFn: (saleData) =>
      apiRequest("POST", "/api/sales", saleData).then((res) => res.json()),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/sales"] });
      setCurrentSale(data);
      setReceiptVisible(true);
      setCart([]);
      setCustomerName("");
      toast({
        title: "Sale completed",
        description: `Sale #${data.id || data._id} has been created successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating sale",
        description: error.message || "Failed to complete the sale.",
        variant: "destructive",
      });
    },
  });

  const addToCart = (product) => {
    const productId = product._id || product.id;
    const existingItemIndex = cart.findIndex((item) => item.productId === productId);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          productId,
          name: product.name,
          price: parseFloat(product.price),
          quantity: 1,
        },
      ]);
    }
    toast({
      title: "Item added",
      description: `${product.name} added to cart.`,
    });
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity > 0) {
      const updatedCart = [...cart];
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
    }
  };

  const calculateSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateTax = () => calculateSubtotal() * 0.05;
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to the cart before checkout.",
        variant: "destructive",
      });
      return;
    }
    if (!customerName.trim()) {
      toast({
        title: "Customer name required",
        description: "Please enter customer name before checkout.",
        variant: "destructive",
      });
      return;
    }
    const saleData = {
      customerName,
      status: "paid",
      items: cart.map((item) => ({
        productId: item.productId,
        productName: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price.toFixed(2)),
      })),
      subtotal: parseFloat(calculateSubtotal().toFixed(2)),
      tax: parseFloat(calculateTax().toFixed(2)),
      total: parseFloat(calculateTotal().toFixed(2)),
      notes: "Sale created by cashier",
    };
    createSaleMutation.mutate(saleData);
  };

  const handlePrintReceipt = () => {
    toast({
      title: "Printing receipt",
      description: "Receipt has been sent to the printer.",
    });
    setReceiptVisible(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Function to handle barcode scan result
  const handleBarcodeScan = (decodedText) => {
    // Check if scanner is running before stopping it
    if (html5QrcodeScannerRef.current && html5QrcodeScannerRef.current.isScanning) {
      html5QrcodeScannerRef.current
        .stop()
        .then(() => {
          html5QrcodeScannerRef.current = null;
          setIsScanning(false);
          fetchProductByBarcode(decodedText);
        })
        .catch((err) => {
          console.warn("Error stopping scanner:", err);
          // If error occurs, proceed anyway
          html5QrcodeScannerRef.current = null;
          setIsScanning(false);
          fetchProductByBarcode(decodedText);
        });
    } else {
      // If not scanning, simply proceed to fetch
      setIsScanning(false);
      fetchProductByBarcode(decodedText);
    }
  };

  const fetchProductByBarcode = (barcode) => {
    apiRequest("GET", `/api/products/barcode/${barcode}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product not found");
        }
        return res.json();
      })
      .then((product) => {
        addToCart(product);
        toast({
          title: "Product Found",
          description: `${product.name} added to cart.`,
        });
      })
      .catch((error) => {
        toast({
          title: "Product Not Found",
          description: "No product matches the scanned barcode.",
          variant: "destructive",
        });
      });
  };

  // Initialize scanner when isScanning becomes true
  useEffect(() => {
    let html5QrcodeScanner;
    if (isScanning) {
      // Delay initialization to ensure the reader element is mounted
      setTimeout(() => {
        if (!readerRef.current) {
          console.error("Reader element not found");
          toast({
            title: "Scanner Error",
            description: "Scanner element not found. Please try again.",
            variant: "destructive",
          });
          setIsScanning(false);
          return;
        }
        const config = { fps: 10, qrbox: 250 };
        try {
          // Use the fixed id from the ref element
          html5QrcodeScanner = new Html5Qrcode(readerRef.current.id);
          html5QrcodeScannerRef.current = html5QrcodeScanner;
          html5QrcodeScanner
            .start(
              { facingMode: "environment" },
              config,
              handleBarcodeScan,
              (errorMessage) => {
                console.log("QR code scanning error:", errorMessage);
              }
            )
            .catch((error) => {
              console.error("Scanner start error:", error);
              toast({
                title: "Scanner Error",
                description: "Failed to start the barcode scanner.",
                variant: "destructive",
              });
              setIsScanning(false);
            });
        } catch (error) {
          console.error("Scanner initialization error:", error);
          toast({
            title: "Scanner Error",
            description: "Failed to initialize the barcode scanner.",
            variant: "destructive",
          });
          setIsScanning(false);
        }
      }, 500);
    }
    return () => {
      if (html5QrcodeScannerRef.current && html5QrcodeScannerRef.current.isScanning) {
        html5QrcodeScannerRef.current
          .stop()
          .catch((err) => {
            console.error("Cleanup stop error:", err);
          })
          .finally(() => {
            html5QrcodeScannerRef.current = null;
          });
      }
    };
  }, [isScanning, toast]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-[#E9C46A] py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Cashier Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-white">Welcome, {user?.name || "Cashier"}</span>
            <Button variant="ghost" className="text-white" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6 px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selection Section */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Products</CardTitle>
              <div className="relative mt-2">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {/* Barcode scan button */}
              <div className="mt-4">
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => setIsScanning(true)}
                >
                  Scan Barcode
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-130px)] overflow-auto">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin h-8 w-8 border-4 border-[#E9C46A] border-t-transparent rounded-full"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredProducts?.map((product) => (
                    <Card key={product.id || product._id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex flex-col h-full">
                          <div className="h-40 bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-gray-400 text-sm">No image</div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-[#264653]">{product.name}</h3>
                            <div className="flex items-center justify-between mt-1">
                              <Badge variant="outline" className="text-xs">
                                {product.category}
                              </Badge>
                              <span className="font-semibold text-[#2A9D8F]">
                                ${parseFloat(product.price).toFixed(2)}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              {product.stock > 0 ? (
                                <span>In stock: {product.stock}</span>
                              ) : (
                                <span className="text-red-500">Out of stock</span>
                              )}
                            </div>
                          </div>
                          <Button
                            className="w-full mt-3 bg-[#E9C46A] hover:bg-[#D9B45A]"
                            onClick={() => addToCart(product)}
                            disabled={product.stock <= 0}
                          >
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add to Bill
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Cart and Checkout Section */}
        <div>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Current Bill</CardTitle>
              <div className="mt-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-280px)] overflow-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No items added to the bill yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => removeFromCart(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex-col border-t pt-6">
              <div className="w-full space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (5%):</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full mt-4 bg-[#2A9D8F] hover:bg-[#1A7C68]"
                onClick={handleCheckout}
                disabled={cart.length === 0 || createSaleMutation.isPending}
              >
                {createSaleMutation.isPending ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </div>
                ) : (
                  "Complete Sale"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Receipt Dialog */}
      <Dialog open={receiptVisible} onOpenChange={setReceiptVisible}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sale Receipt</DialogTitle>
          </DialogHeader>
          {currentSale && (
            <div className="bg-white p-4 rounded-md">
              <div className="text-center mb-4">
                <h2 className="font-bold text-xl">Jungle Safari Souvenir Shop</h2>
                <p className="text-gray-500">
                  Receipt #{currentSale.id || currentSale._id}
                </p>
                <p className="text-gray-500">{new Date().toLocaleString()}</p>
              </div>
              <div className="mb-4">
                <p>
                  <strong>Customer:</strong> {currentSale.customerName}
                </p>
                <p>
                  <strong>Status:</strong> <Badge>{currentSale.status}</Badge>
                </p>
              </div>
              <table className="w-full mb-4">
                <thead className="border-b">
                  <tr>
                    <TableHead className="text-left py-2">Item</TableHead>
                    <TableHead className="text-center py-2">Qty</TableHead>
                    <TableHead className="text-right py-2">Price</TableHead>
                    <TableHead className="text-right py-2">Total</TableHead>
                  </tr>
                </thead>
                <tbody>
                  {currentSale.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <TableCell className="py-2">{item.productName}</TableCell>
                      <TableCell className="text-center py-2">{item.quantity}</TableCell>
                      <TableCell className="text-right py-2">${parseFloat(item.price).toFixed(2)}</TableCell>
                      <TableCell className="text-right py-2">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="space-y-1 border-t pt-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${parseFloat(currentSale.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${parseFloat(currentSale.tax).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-1 border-t">
                  <span>Total:</span>
                  <span>${parseFloat(currentSale.total).toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 text-center text-gray-500 text-sm">
                <p>Thank you for shopping with us!</p>
                <p>Please visit again soon.</p>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Button onClick={handlePrintReceipt} className="bg-[#2A9D8F]">
              <Printer className="mr-2 h-4 w-4" />
              Print Receipt
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Barcode Scanner Dialog */}
      {isScanning && (
        <Dialog open={isScanning} onOpenChange={setIsScanning}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Scan Barcode</DialogTitle>
            </DialogHeader>
            {/* Reader element for the scanner */}
            <div id="reader" ref={readerRef} style={{ width: "100%" }}></div>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setIsScanning(false)} className="bg-red-500 hover:bg-red-600 text-white">
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
