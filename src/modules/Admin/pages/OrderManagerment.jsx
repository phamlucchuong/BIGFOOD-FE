import React, { useState, useEffect } from "react";
import PageMeta from "../components/common/PageMeta";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import TableData from "../components/tables/TableData";
import useOrder from "../../../hooks/data/useOrder";

export default function OrderManagerment() {
  const { orders, getOrder } = useOrder();

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <PageMeta
        title="Quản lý đơn hàng"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Quản lý đơn hàng" />
      <div className="space-y-6">
        <div className="max-w-full overflow-x-auto">
          {orders.length > 0 ? (
            <Table>
              {/* Table Header */}
              <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                <TableRow>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Restaurants
                    {/* orders */}
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Total Price
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Customers
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}

              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {topRecentOrders.map((order) => (
                  <TableRow key={order.id} className="">
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                          <img
                            src={`${order.restaurantBanner}`}
                            className="h-[50px] w-[50px]"
                            alt={order.restaurantName}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {order.restaurantName}
                          </p>
                          <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            {order.numberDishes}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {order.totalAmount}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {order.category}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          order.status === "Delivered"
                            ? "success"
                            : order.status === "PENDING"
                            ? "warning"
                            : "error"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="w-full py-32 flex justify-center items-center">
              <p className="text-gray-500 text-lg">Danh sách trống . . .</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
