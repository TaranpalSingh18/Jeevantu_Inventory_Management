// import { Card, CardContent, CardFooter } from "../Card";
// import { useQuery } from "@tanstack/react-query";
// import { CheckCircle } from "lucide-react";
// import { useState } from "react";
// import { Link } from "wouter";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select";

// export default function RecentTransactions() {
//   const [timeFilter, setTimeFilter] = useState("today");
  
//   const { data: transactions, isLoading } = useQuery({
//     queryKey: ["/api/transactions/recent", timeFilter],
//   });

//   const handleTimeFilterChange = (value) => {
//     setTimeFilter(value);
//   };

//   return (
//     <Card className="bg-white shadow h-full">
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-medium text-[#264653]">Recent Transactions</h2>
//           <div>
//             <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
//               <SelectTrigger className="text-sm rounded border-gray-300 text-[#264653] bg-[#F4F1DE] py-1 px-2 h-8 w-32">
//                 <SelectValue placeholder="Select period" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="today">Today</SelectItem>
//                 <SelectItem value="yesterday">Yesterday</SelectItem>
//                 <SelectItem value="week">Last 7 days</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
        
//         <div className="divide-y divide-gray-200 -mx-6">
//           {isLoading ? (
//             Array(4).fill(0).map((_, index) => (
//               <div key={index} className="px-6 py-3 flex items-center space-x-3">
//                 <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
//                 <div className="flex-1 space-y-2">
//                   <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
//                   <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
//                 </div>
//                 <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
//               </div>
//             ))
//           ) : (
//             transactions?.map((transaction) => (
//               <div key={transaction.id} className="px-6 py-3 flex items-center">
//                 <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#27AE60] bg-opacity-10 flex items-center justify-center text-[#27AE60]">
//                   <CheckCircle className="h-5 w-5" />
//                 </div>
//                 <div className="ml-3 flex-1">
//                   <p className="text-sm font-medium text-[#264653]">Order #{transaction.id}</p>
//                   <p className="text-xs text-gray-500">
//                     {transaction.itemCount} item{transaction.itemCount !== 1 ? 's' : ''} • {transaction.time}
//                   </p>
//                 </div>
//                 <div className="text-sm font-medium text-[#264653]">${transaction.amount.toFixed(2)}</div>
//               </div>
//             ))
//           )}
//         </div>
//       </CardContent>
//       <CardFooter className="pt-3 border-t border-gray-200 flex justify-center">
//         <Link href="/sales" className="text-[#2A9D8F] text-sm font-medium hover:text-[#1E7268]">
//           View all transactions
//         </Link>
//       </CardFooter>
//     </Card>
//   );
// }

import { Card, CardContent, CardFooter } from "../Card";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select";

export default function RecentTransactions() {
  const [timeFilter, setTimeFilter] = useState("today");
  
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["/api/transactions/recent", timeFilter],
  });

  const handleTimeFilterChange = (value) => {
    setTimeFilter(value);
  };

  return (
    <Card className="bg-white shadow h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-[#264653]">Recent Transactions</h2>
          <div>
            <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
              <SelectTrigger className="text-sm rounded border-gray-300 text-[#264653] bg-[#F4F1DE] py-1 px-2 h-8 w-32">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))
          ) : (
            transactions?.map((transaction) => (
              <div key={transaction._id || transaction.id} className="px-6 py-3 flex items-center">
                <div className="flex-shrink-0 h-9 w-9 rounded-full bg-[#27AE60] bg-opacity-10 flex items-center justify-center text-[#27AE60]">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-[#264653]">Order #{transaction._id || transaction.id}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.itemCount} item{transaction.itemCount !== 1 ? 's' : ''} • {transaction.time}
                  </p>
                </div>
                <div className="text-sm font-medium text-[#264653]">${parseFloat(transaction.amount).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t border-gray-200 flex justify-center">
        <Link href="/sales" className="text-[#2A9D8F] text-sm font-medium hover:text-[#1E7268]">
          View all transactions
        </Link>
      </CardFooter>
    </Card>
  );
}
