"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@material-tailwind/react";
import CartCountUpdater from "@components/CartCountUpdater";
import router from "next/router";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

export default function BuyingOptions() {
    const [quantity, setQuantity] = useState(1);
    const [isPending, startTransition] = useTransition();
    const { product } = useParams();
    const productId = product[1];
    const { loggedIn } = useAuth();
    const router = useRouter();



    const handleIncrement = () => {
        setQuantity((prevCount) => prevCount + 1);
    };

    const handleDecrement = () => {
        if (quantity === 0) return;
        setQuantity((prevCount) => prevCount - 1);
    };

    const addToCart = async () => {
        if (!productId) return;

        if (!loggedIn) return router.push("/auth/signin");

        const res = await fetch("/api/product/cart", {
            method: "POST",
            body: JSON.stringify({ productId, quantity }),
        });

        const { error } = await res.json();
        if (!res.ok && error) toast.error(error);

        router.refresh();
    };

    return (
        <div className="flex items-center space-x-2">
            <CartCountUpdater
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
                value={quantity}
            />

            <Button onClick={() => {
                startTransition(async () => await addToCart())
            }} 
            variant="text"
            disabled={isPending}>Thêm vào giỏ hàng</Button>
            <Button disabled={isPending} color="amber" className="rounded-full">
                Mua ngay
            </Button>
        </div>
    );
}
