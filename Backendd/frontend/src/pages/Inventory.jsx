import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "../hooks/use-toast";
import { Plus, Edit, Trash2, Search, Filter, Package, Eye } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "../components/ui/Card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Please enter a category"), // updated message
  price: z.coerce.number().positive("Price must be a positive number"),
  cost: z.coerce.number().positive("Cost must be a positive number"),
  stock: z.coerce.number().nonnegative("Stock can't be negative"),
  minStock: z.coerce.number().nonnegative("Min stock can't be negative"),
  description: z.string().optional(),
  imageUrl: z.string().url("Please enter a valid URL").optional(),
});

export default function Inventory() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  // New state for viewing product details
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Use "all" as default for the filter so we never use an empty string in a SelectItem.
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 0,
      description: "",
      imageUrl: "",
    },
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products"],
  });

  // Categories are still used for filtering in the table
  const { data: categories } = useQuery({
    queryKey: ["/api/products/categories"],
  });

  const createProductMutation = useMutation({
    mutationFn: (product) => apiRequest("POST", "/api/products", product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create product: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (product) =>
      apiRequest("PATCH", `/api/products/${product.id}`, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      setIsDialogOpen(false);
      setEditingProduct(null);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update product: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (productId) =>
      apiRequest("DELETE", `/api/products/${productId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete product: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data) => {
    if (editingProduct) {
      updateProductMutation.mutate({ ...data, id: editingProduct._id });
    } else {
      createProductMutation.mutate(data);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      category: product.category,
      price: product.price,
      cost: product.cost,
      stock: product.stock,
      minStock: product.minStock,
      description: product.description || "",
      imageUrl: product.imageUrl || "",
    });
    setIsDialogOpen(true);
  };

  // Updated deletion to use product._id || product.id
  const handleDelete = (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(productId);
    }
  };

  // New function to handle viewing details
  const handleView = (product) => {
    setSelectedProduct(product);
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    form.reset({
      name: "",
      category: "",
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 0,
      description: "",
      imageUrl: "",
    });
    setIsDialogOpen(true);
  };

  // Filtering logic
  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ? true : product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <Card className="bg-white shadow">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-[#264653]">Inventory Management</h1>
              <div className="ml-4 px-2 py-1 bg-[#2A9D8F] text-white text-xs rounded-full">
                {products?.length || 0} items
              </div>
            </div>
            
            <Button 
              onClick={openAddDialog}
              className="bg-[#2A9D8F] hover:bg-[#1E7268] text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Product
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="w-full sm:w-64">
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-full">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-gray-400" />
                    <SelectValue placeholder="All Categories" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-center">Status</TableHead>
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
                ) : filteredProducts?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts?.map((product) => (
                    <TableRow key={product._id || product.id}>
                      <TableCell>
                        <div className="flex items-center">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="h-10 w-10 rounded object-cover mr-3"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded bg-[#F4F1DE] flex items-center justify-center mr-3">
                              <Package className="h-5 w-5 text-[#264653]" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-[#264653]">{product.name}</div>
                            {product.description && (
                              <div className="text-xs text-gray-500 truncate max-w-[200px]">
                                {product.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full bg-[#F4F1DE] text-[#264653] text-xs">
                          {product.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${product.cost.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs
                          ${product.stock <= 0
                            ? "bg-[#EB5757] bg-opacity-10 text-[#EB5757]"
                            : product.stock < product.minStock
                              ? "bg-[#F2C94C] bg-opacity-10 text-[#F2C94C]"
                              : "bg-[#27AE60] bg-opacity-10 text-[#27AE60]"}
                        `}>
                          {product.stock <= 0
                            ? "Out of Stock"
                            : product.stock < product.minStock
                              ? "Low Stock"
                              : "In Stock"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleView(product)}
                          >
                            <Eye className="h-4 w-4 text-[#2A9D8F]" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit className="h-4 w-4 text-[#2A9D8F]" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleDelete(product._id || product.id)
                            }
                          >
                            <Trash2 className="h-4 w-4 text-[#EB5757]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Safari Hat" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Changed Category field from Select to Input */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter category" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Stock</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="minStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Stock Level</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Product description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com/image.jpg" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#2A9D8F] hover:bg-[#1E7268]"
                  disabled={createProductMutation.isPending || updateProductMutation.isPending}
                >
                  {createProductMutation.isPending || updateProductMutation.isPending ? (
                    <div className="flex items-center">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    editingProduct ? "Update Product" : "Add Product"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Product Details Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div>
                <strong>Name:</strong> {selectedProduct.name}
              </div>
              <div>
                <strong>Category:</strong> {selectedProduct.category}
              </div>
              <div>
                <strong>Price:</strong> ${selectedProduct.price.toFixed(2)}
              </div>
              <div>
                <strong>Cost:</strong> ${selectedProduct.cost.toFixed(2)}
              </div>
              <div>
                <strong>Stock:</strong> {selectedProduct.stock}
              </div>
              <div>
                <strong>Minimum Stock:</strong> {selectedProduct.minStock}
              </div>
              {selectedProduct.description && (
                <div>
                  <strong>Description:</strong> {selectedProduct.description}
                </div>
              )}
              {selectedProduct.imageUrl && (
                <div>
                  <strong>Image:</strong>
                  <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="mt-2 h-20 w-20 rounded" />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedProduct(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
