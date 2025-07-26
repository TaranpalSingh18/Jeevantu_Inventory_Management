import { Package, Coins, ShoppingCart, AlertTriangle } from "lucide-react";
import StatsCard from "../components/ui/dashboard/StatsCard";
import SalesChart from "../components/ui/dashboard/SalesChart";
import TopProducts from "../components/ui/dashboard/TopProducts";
import InventoryAlerts from "../components/ui/dashboard/InventoryAlerts";
import RecentTransactions from "../components/ui/dashboard/RecentTransactions";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard 
          title="Total Products" 
          value={isLoading ? "..." : stats?.totalProducts || 0}
          change={{ 
            type: "increase", 
            value: stats?.productsTrend || "0%" 
          }}
          icon={<Package className="h-5 w-5" />}
          iconBgColor="#4DB6AA" // primary-light
        />
        
        <StatsCard 
          title="Monthly Revenue" 
          value={isLoading ? "..." : `$${stats?.monthlyRevenue.toLocaleString() || 0}`}
          change={{ 
            type: "increase", 
            value: stats?.revenueTrend || "0%" 
          }}
          icon={<Coins className="h-5 w-5" />}
          iconBgColor="#E9C46A" // secondary
        />
        
        <StatsCard 
          title="Today's Sales" 
          value={isLoading ? "..." : stats?.todaySales || 0}
          change={{ 
            type: "decrease", 
            value: stats?.salesTrend || "0%" 
          }}
          icon={<ShoppingCart className="h-5 w-5" />}
          iconBgColor="#E76F51" // accent
        />
        
        <StatsCard 
          title="Low Stock Items" 
          value={isLoading ? "..." : stats?.lowStockItems || 0}
          change={{ 
            type: "warning", 
            value: "2 new" 
          }}
          icon={<AlertTriangle className="h-5 w-5" />}
          iconBgColor="#264653" // forest
        />
      </div>

      {/* Charts and Top Products */}
      {/* <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        
        <div>
          <TopProducts />
        </div>
      </div> */}

      {/* Inventory Alerts and Recent Transactions */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InventoryAlerts />
        <RecentTransactions />
      </div>
    </div>
  );
}