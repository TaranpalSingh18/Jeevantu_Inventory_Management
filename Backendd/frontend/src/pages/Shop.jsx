import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerTrigger,
} from "../components/ui/Drawer";
import { Badge } from "../components/ui/Badge";
import {
  ShoppingCart,
  Search,
  Filter,
  Home,
  User,
  ChevronDown,
  Star,
  X,
  Minus,
  Plus,
  LogOut,
} from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useAppContext } from "../context/AppContext";
import Footer from "../components/ui/Footer";

export default function Shop() {
  const [, navigate] = useLocation();
  const { user, logout } = useAppContext();
  const { toast } = useToast();
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products"],
    queryFn: () => apiRequest("GET", "/api/products").then((res) => res.json()),
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["/api/products/categories"],
    queryFn: () =>
      apiRequest("GET", "/api/products/categories").then((res) => res.json()),
  });

  // Filter and sort products
  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    if (sortBy === "price-asc")
      return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === "price-desc")
      return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  // Cart functions
  const addToCart = (product) => {
    if (!user) {
      toast({
        title: "Not Logged In",
        description: "Please log in or sign up to add items to your cart.",
        variant: "destructive",
      });
      navigate("/user-login");
      return;
    }
    if (product.stock <= 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      });
      return;
    }
    const productId = product._id || product.id;
    const existingItemIndex = cart.findIndex((item) => item.id === productId);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          id: productId,
          name: product.name,
          price: parseFloat(product.price),
          imageUrl: product.imageUrl,
          quantity: 1,
        },
      ]);
    }
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const updateQuantity = (index, changeOrValue) => {
    const updatedCart = [...cart];
    let newQuantity =
      typeof changeOrValue === "number"
        ? updatedCart[index].quantity + changeOrValue
        : changeOrValue;
    if (newQuantity <= 0) {
      removeFromCart(index);
    } else {
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const calculateCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Create sale mutation (backend creates Sale and Payment record)
  const createSaleMutation = useMutation({
    mutationFn: (saleData) =>
      apiRequest("POST", "/api/sales", saleData).then((res) => res.json()),
    onError: (error) => {
      toast({
        title: "Error creating sale",
        description: error.message || "Failed to complete the sale.",
        variant: "destructive",
      });
    },
  });

  // Updated checkout function with payment creation
  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Not Logged In",
        description: "Please log in or sign up to proceed with checkout.",
        variant: "destructive",
      });
      navigate("/user-login");
      return;
    }
    if (cart.length === 0) {
      toast({
        title: "Empty cart",
        description: "Please add items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }
    // Build sale data from cart.
    const saleData = {
      customerName: user?.name || "Guest",
      status: "pending",
      items: cart.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price.toFixed(2)),
      })),
      subtotal: parseFloat(calculateCartTotal().toFixed(2)),
      tax: parseFloat((calculateCartTotal() * 0.05).toFixed(2)),
      total: parseFloat((calculateCartTotal() * 1.05).toFixed(2)),
      notes: "Sale created by user",
    };
  
    try {
      // Create the sale and get the result
      const result = await createSaleMutation.mutateAsync(saleData);
      console.log("Sale creation result:", result);
      // Since your backend returns the sale directly, use result._id
      const saleId = result._id;
      if (!saleId) {
        throw new Error("Sale ID not found in response");
      }
  
      // Build payment data for the new Payment record
      const paymentData = {
        saleId,
        amount: saleData.total,
        method: "credit_card", // Adjust as needed
        status: "pending", // Initially pending; update after payment confirmation
        customerName: user?.name,
        reference: "ref-123456", // Optionally generate a unique reference
      };
  
      // Create a Payment record by calling the payment API endpoint
      const paymentResult = await apiRequest("POST", "/api/user/payment", paymentData)
        .then((res) => res.json());
      
      console.log("Payment record created:", paymentResult);
  
      // Open a simulated payment gateway window (adjust URL as necessary)
      const totalAmount = calculateCartTotal().toFixed(2);
      const paymentUrl = `https://payment-gateway.example.com/checkout?amount=${totalAmount}`;
      window.open(paymentUrl, "_blank");
  
      // Simulate waiting for payment confirmation (e.g., 3 seconds delay)
      setTimeout(async () => {
        const updatedSale = await apiRequest(
          "PATCH",
          `/api/sales/${saleId}/status`,
          { status: "paid" }
        ).then((res) => res.json());
        queryClient.invalidateQueries({ queryKey: ["/api/sales"] });
        toast({
          title: "Sale completed",
          description: `Sale #${updatedSale._id} has been completed and payment is successful.`,
        });
        setCart([]);
      }, 3000);
    } catch (error) {
      toast({
        title: "Error completing sale",
        description: error.message || "Failed to complete the sale.",
        variant: "destructive",
      });
    }
  };
  

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-[#E76F51] py-4 px-6 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-white flex items-center"
          >
            <Home className="h-6 w-6 mr-2" />
            Jeevantu
          </Link>
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/90 border-none"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" className="relative text-white">
                  <ShoppingCart className="h-6 w-6" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-white text-[#E76F51] h-5 w-5 p-0 flex items-center justify-center rounded-full">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-white text-gray-900">
                <DrawerHeader>
                  <DrawerTitle>Shopping Cart</DrawerTitle>
                </DrawerHeader>
                <div className="px-4 py-2">
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 mx-auto text-gray-300" />
                      <p className="mt-4 text-gray-500">Your cart is empty</p>
                    </div>
                  ) : (
                    <div>
                      <div className="space-y-4 max-h-[60vh] overflow-auto py-2">
                        {cart.map((item, index) => (
                          <div key={index} className="flex border-b pb-4">
                            <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0 mr-3 overflow-hidden">
                              {item.imageUrl ? (
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                  No image
                                </div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium">{item.name}</h3>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-gray-400 -mr-2"
                                  onClick={() => removeFromCart(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center border rounded">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 p-0"
                                    onClick={() => updateQuantity(index, -1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <Input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      updateQuantity(index, parseInt(e.target.value))
                                    }
                                    className="w-12 text-center p-0 border-none"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 p-0"
                                    onClick={() => updateQuantity(index, 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <span className="font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t mt-4 pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Total</span>
                          <span className="font-semibold text-lg">
                            ${calculateCartTotal().toFixed(2)}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={handleClearCart}
                          >
                            Clear Cart
                          </Button>
                          <Button
                            className="flex-1 bg-[#E76F51] hover:bg-[#D75F41]"
                            onClick={handleCheckout}
                          >
                            Checkout
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>
            {user ? (
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="text-white"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link href="/user-login">
                <Button variant="ghost" className="text-white">
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <div className="md:hidden px-4 py-3 bg-white shadow-sm">
        <div className="relative">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="md:w-64 space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h2 className="font-semibold flex items-center mb-3">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Categories</h3>
                      <div className="space-y-1">
                        <div
                          className={`px-2 py-1 text-sm rounded-md cursor-pointer hover:bg-gray-100 ${
                            selectedCategory === "" ? "bg-gray-100 font-medium" : ""
                          }`}
                          onClick={() => setSelectedCategory("")}
                        >
                          All Categories
                        </div>
                        {categories?.map((category, index) => (
                          <div
                            key={index}
                            className={`px-2 py-1 text-sm rounded-md cursor-pointer hover:bg-gray-100 ${
                              selectedCategory === category
                                ? "bg-gray-100 font-medium"
                                : ""
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Sort By</h3>
                      <select
                        className="w-full p-2 border rounded-md text-sm"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <h2 className="font-semibold mb-3">Need Help?</h2>
                  <p className="text-sm text-gray-600 mb-3">
                    Our customer service team is here to help you with any
                    questions.
                  </p>
                  <Button className="w-full">Contact Us</Button>
                </CardContent>
              </Card>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-[#264653]">
                  {selectedCategory
                    ? `${selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1)} Products`
                    : "All Products"}
                </h1>
                <div className="text-sm text-gray-500">
                  {sortedProducts?.length}{" "}
                  {sortedProducts?.length === 1 ? "product" : "products"} found
                </div>
              </div>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin h-8 w-8 border-4 border-[#E76F51] border-t-transparent rounded-full"></div>
                </div>
              ) : sortedProducts?.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                  <Search className="h-12 w-12 mx-auto text-gray-300" />
                  <h3 className="mt-4 text-lg font-medium">
                    No products found
                  </h3>
                  <p className="mt-1 text-gray-500">
                    Try adjusting your search or filter to find what you're looking
                    for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedProducts?.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-48 bg-gray-100">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image available
                          </div>
                        )}
                        <Badge className="absolute top-2 left-2 bg-white text-[#264653]">
                          {product.category}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-[#264653] text-lg">
                          {product.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 4
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">
                            (4.0)
                          </span>
                        </div>
                        <p className="text-lg font-semibold text-[#2A9D8F] mt-2">
                          ${parseFloat(product.price).toFixed(2)}
                        </p>
                        <div className="mt-3 text-sm text-gray-500">
                          {product.stock > 0 ? (
                            <span>
                              In stock ({product.stock} available)
                            </span>
                          ) : (
                            <span className="text-red-500">
                              Out of stock
                            </span>
                          )}
                        </div>
                        <Button
                          className="mt-3 w-full bg-[#E76F51] hover:bg-[#D75F41]"
                          onClick={() => addToCart(product)}
                          disabled={product.stock <= 0}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer/>
      <Drawer open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DrawerTrigger asChild></DrawerTrigger>
        <DrawerContent className="bg-white text-gray-900">
          <DrawerHeader>
            <DrawerTitle>Shopping Cart</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 py-2">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-300" />
                <p className="mt-4 text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div>
                <div className="space-y-4 max-h-[60vh] overflow-auto py-2">
                  {cart.map((item, index) => (
                    <div key={index} className="flex border-b pb-4">
                      <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0 mr-3 overflow-hidden">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400 -mr-2"
                            onClick={() => removeFromCart(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(index, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(index, parseInt(e.target.value))
                              }
                              className="w-12 text-center p-0 border-none"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(index, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total</span>
                    <span className="font-semibold text-lg">
                      ${calculateCartTotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </Button>
                    <Button
                      className="flex-1 bg-[#E76F51] hover:bg-[#D75F41]"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
