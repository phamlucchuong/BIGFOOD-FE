import Badge from "../ui/Badge";
import { UsersRound, Box, ArrowUp, ArrowDown} from "lucide-react";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import useOrder from "../../../../hooks/data/useOrder";

export default function EcommerceMetrics() {

  const { userSummary, handleUserSummary } = useUser();
  const { orderSummary, getOrderSummary } = useOrder();

  useEffect(() => {
    handleUserSummary();
    getOrderSummary();
  }, []);


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-800 bg-[#171F2F] p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <UsersRound className="text-white" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Accounts
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-3xl dark:text-white/90">
              {userSummary.total}
            </h4>
          </div>
          <Badge color={`${userSummary.direction === "increase" ? "success" : "error"}`}>
            {
              userSummary.direction === "increase" ? <ArrowUp /> : <ArrowDown />
            }
            {userSummary.changePercentage} %
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-800 bg-[#171F2F] p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <i className="fa-solid fa-basket-shopping text-xl text-white"></i>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-3xl dark:text-white/90">
              {orderSummary.total}
            </h4>
          </div>

          <Badge color={`${orderSummary.direction === "increase" ? "success" : "error"}`}>
            {
              orderSummary.direction === "increase" ? <ArrowUp /> : <ArrowDown />
            }
            {orderSummary.changePercentage} %
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
