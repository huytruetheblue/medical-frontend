"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/reduxs/hooks";
import InfoComponents from "@/components/InfoComponent";
import TestComponents from "@/components/TestComponent";

const TestHistoryPage = () => {
  const { address } = useAppSelector((state) => state.address);
  const router = useRouter();
  React.useEffect(() => {
    if (!address) {
      router.push("/");
    }
  });
  return (
    <div>
      <div className="shadow-lg shadow-gray-500/50">
        <div className="px-4 sm:px-0">
          <h3 className="px-4 pt-4 text-base font-semibold leading-7 text-gray-900">
            Test History Page
          </h3>
          <p className="px-4 pb-4 mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Lịch sử tiêm chủng của người dùng
          </p>
        </div>
      </div>
      {address && <InfoComponents address={address} />}

      <br />
      {address && <TestComponents address={address} />}
    </div>
  );
};

export default TestHistoryPage;
