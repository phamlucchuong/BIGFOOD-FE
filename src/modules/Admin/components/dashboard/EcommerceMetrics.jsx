import Badge from "../ui/Badge";
import { UsersRound, Box, ArrowUp, ArrowDown} from "lucide-react";

export default function EcommerceMetrics() {
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
              3,782
            </h4>
          </div>
          <Badge color="success">
            <ArrowUp />
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-800 bg-[#171F2F] p-5 md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <Box className="text-white"/>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-3xl dark:text-white/90">
              5,359
            </h4>
          </div>

          <Badge color="error">
            <ArrowDown />
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
