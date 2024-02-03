"use client"

import Link from "next/link";
import React, { ReactNode } from "react";
import {
  Squares2X2Icon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  SparklesIcon,
  ShoppingBagIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from 'next/image'
import SignOutButton from "@components/SignOutButton";

interface Props {
  children: ReactNode;
}

const AdminSidebar = ({ children }: Props) => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between bg-white h-screen sticky top-10 w-64 p-10 rounded shadow-lg">
        <ul className="space-y-6 text-grey-600">
          <li>
            <Link
              className=" flex items-center space-x-1 font-semibold text-xl text-grey-600"
              href="/dashboard"
            > 
              <Image src="https://img.logoipsum.com/248.svg" alt="Home" width={50} height={50}/> 
              <span>PSMS</span> 
            </Link>
            
          </li>
          <li>
            <button type="button" className="cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 w-full rounded">
              <Link className="flex items-center space-x-1 text-lg" href="/dashboard">
                <Squares2X2Icon className="w-10 h-10" />
                <span>Trang chủ</span>
              </Link>
            </button>
            <hr className="w-full " />
          </li>
          <li>
            <button type="button" className="cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 w-full rounded">
              <Link className="flex items-center space-x-1 text-lg" href="/products">
                <ShoppingCartIcon className="w-10 h-10" />
                <span>Sản phẩm</span>
              </Link>
            </button>
            <hr className="w-full " />
          </li>
  
          <li>
            <button type="button" className="cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 w-full rounded">
              <Link className="flex items-center space-x-1 text-lg" href="/sales">
                <CurrencyDollarIcon className="w-10 h-10" />
                <span>Doanh thu</span>
              </Link>
            </button>
            <hr className="w-full " />
          </li>
          <li>
            <button type="button" className="cursor-pointer hover:bg-indigo-50 hover:text-indigo-600 w-full rounded">
              <Link className="flex items-center space-x-1 text-lg" href="/orders">
                <ShoppingBagIcon className="w-10 h-10" />
                <span>Đơn hàng</span>
              </Link>
            </button>
            <hr className="w-full " />
          </li>
        </ul>

        <div>
          <Link href="/">
            <div className="cursor-pointer hover:bg-red-50 text-red-400 hover:text-red-800 text-lg flex items-center space-x-1 rounded">
              <ArrowLeftOnRectangleIcon className="w-10 h-10"/>
              Thoát
            </div>
          </Link>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto flex-1 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default AdminSidebar;
