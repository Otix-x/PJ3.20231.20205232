"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
    id?: string;
    verified?: boolean;
}

export default function EmailVerificationBanner({ id, verified }: Props) {
    const [submitting, setSubmitting] = useState(false);

    const applyForReverification = async () => {
        if (!id) return;

        setSubmitting(true);
        const res = await fetch("/api/users/verify?userId=" + id, {
            method: "GET",
        });
        const { message, error } = await res.json();
        if (!res.ok && error) {
            toast.error(error);
        }

        toast.success(message);
        setSubmitting(false);
    };

    if (verified) return null;

    return (
        <div className="p-2 text-center bg-blue-50">
            <span>
                Bạn chưa xác thực email này. Hãy xác thực email để thực hiện các chức năng tiếp theo.
            </span>
            <button
                disabled={submitting}
                onClick={applyForReverification}
                className="ml-2 font-semibold underline"
            >
                {submitting? "Đang tạo đường dẫn...": "Nhận đường dẫn xác thực."}
            </button>
        </div>
    );
}
