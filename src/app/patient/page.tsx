"use client";

import InfoComponents from "@/components/InfoComponent";
import { InputWithButton } from "@/components/InputWithButton";

import { useAppSelector } from "@/reduxs/hooks";
import React from "react";

export default function Home() {
  const { address } = useAppSelector((state) => state.address);

  return (
    <div>
      <div className="shadow-lg shadow-gray-500/50">
        <div className="px-4 sm:px-0">
          <h3 className="px-4 pt-4 text-base font-semibold leading-7 text-gray-900">
            Personal page
          </h3>
          <p className="px-4 pb-4 mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Thông tin cá nhân của người dùng
          </p>
        </div>
      </div>

      {address && <InfoComponents address={address} />}
    </div>
  );
}
