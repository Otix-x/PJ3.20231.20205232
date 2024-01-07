import RecentOrdersList, {
  RecentOrders,
} from "@/app/components/RecentOrdersList";
import startDb from "@/app/lib/db";
import OrderModel from "@/app/models/orderModel";
import { ObjectId } from "mongoose";
import React from "react";

const fetchRecentOrders = async () => {
  await startDb();
  const orders = await OrderModel.find({ paymentStatus: "paid" })
    .sort("-createdAt")
    .limit(5);

  const result = orders.map((order): RecentOrders => {
    return {
      id: order._id.toString(),
      customerInfo: {
        name: order.shippingDetails.name,
      },
      products: order.orderItems,
    };
  });

  return JSON.stringify(result);
};

export default async function Dashboard() {
  const orders = JSON.parse(await fetchRecentOrders());
  return (
    <div className="flex space-x-6">
      <RecentOrdersList orders={orders} />
    </div>
  );
}
