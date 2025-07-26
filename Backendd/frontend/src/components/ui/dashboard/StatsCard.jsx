import { Card, CardContent } from "../Card";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function StatsCard({ title, value, change, icon, iconBgColor }) {
  const getChangeColor = () => {
    switch (change?.type) {
      case "increase":
        return "text-[#27AE60]";
      case "decrease":
        return "text-[#EB5757]";
      case "warning":
        return "text-[#F2C94C]";
      default:
        return "text-gray-500";
    }
  };

  const ChangeIcon = change?.type === "increase" ? ArrowUp : ArrowDown;

  return (
    <Card className="bg-white overflow-hidden shadow">
      <CardContent className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3`} style={{ backgroundColor: iconBgColor }}>
            <div className="text-white">{icon}</div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-[#264653]">{value}</div>
                {change && (
                  <div className={`ml-2 flex items-baseline text-sm font-medium ${getChangeColor()}`}>
                    {change.type !== "warning" && <ChangeIcon className="h-3 w-3" />}
                    <span className="ml-1">{change.value}</span>
                  </div>
                )}
              </dd>
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}