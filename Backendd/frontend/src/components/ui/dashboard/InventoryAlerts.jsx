import { Card, CardContent, CardFooter } from "../Card.jsx";
import { Button } from "../Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { apiRequest, queryClient } from "../../../lib/queryClient";
import { useToast } from "../../../hooks/use-toast";
import { Link } from "wouter";

export default function InventoryAlerts() {
  const { toast } = useToast();
  
  const { data: inventoryAlerts, isLoading } = useQuery({
    queryKey: ["/api/inventory/alerts"],
  });

  const restockMutation = useMutation({
    mutationFn: (productId) => {
      return apiRequest("POST", `/api/inventory/restock/${productId}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inventory/alerts"] });
      toast({
        title: "Restock order created",
        description: "A restock order has been created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create restock order",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleRestock = (productId) => {
    restockMutation.mutate(productId);
  };

  const alertsCount = inventoryAlerts?.length || 0;

  return (
    <Card className="bg-white shadow h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#264653]">Inventory Alerts</h2>
          <span className="px-2 py-1 text-xs rounded-full bg-[#EB5757] text-white">
            {alertsCount} alerts
          </span>
        </div>
        
        <div className="divide-y divide-gray-200 -mx-6">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="px-6 py-3 flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))
          ) : (
            inventoryAlerts?.map((alert) => (
              <div key={alert._id} className="px-6 py-3 flex items-center">
                <div
                  className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center
                  ${alert.status === "critical" 
                    ? "bg-[#EB5757] bg-opacity-10 text-[#EB5757]" 
                    : "bg-[#F2C94C] bg-opacity-10 text-[#F2C94C]"}`
                  }
                >
                  {alert.status === "critical" ? (
                    <AlertCircle className="h-5 w-5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-[#264653]">{alert.product}</p>
                  <p className="text-xs text-gray-500">
                    Stock:{" "}
                    <span
                      className={`font-medium ${
                        alert.status === "critical" ? "text-[#EB5757]" : "text-[#F2C94C]"
                      }`}
                    >
                      {alert.currentStock} units
                    </span>{" "}
                    (Min: {alert.minRequiredStock})
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-[#2A9D8F] hover:text-[#1E7268] text-sm font-medium"
                  onClick={() => handleRestock(alert._id)}
                  disabled={restockMutation.isPending}
                >
                  Restock
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t border-gray-200 flex justify-center">
        <Link href="/inventory" className="text-[#2A9D8F] text-sm font-medium hover:text-[#1E7268]">
          View all alerts
        </Link>
      </CardFooter>
    </Card>
  );
}
