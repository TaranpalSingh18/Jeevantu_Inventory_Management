import { Card, CardContent, CardFooter } from "../Card";
import { Progress } from "../Progress";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { Link } from "wouter";

export default function TopProducts() {
  const { data: topProducts, isLoading } = useQuery({
    queryKey: ["/api/products/top"],
  });

  return (
    <Card className="bg-white shadow h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#264653]">Top Products</h2>
          <button className="text-[#2A9D8F] hover:text-[#1E7268]">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-5">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded bg-gray-200 animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))
          ) : (
            topProducts?.map((product) => (
              <div key={product.id} className="flex items-center">
                <img 
                  className="h-12 w-12 rounded object-cover"
                  src={product.image} 
                  alt={product.name}
                />
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#264653] truncate">{product.name}</p>
                  <div className="flex items-center">
                    <Progress
                      value={product.percentage}
                      className="h-2 w-32 bg-[#E5E0C6]"
                      indicatorClassName="bg-[#2A9D8F]"
                    />
                    <span className="ml-2 text-xs text-gray-500">{product.percentage}%</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-[#264653]">${product.price}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t border-gray-200">
        <Link href="/inventory" className="text-[#2A9D8F] text-sm font-medium hover:text-[#1E7268]">
          View all products
        </Link>
      </CardFooter>
    </Card>
  );
}