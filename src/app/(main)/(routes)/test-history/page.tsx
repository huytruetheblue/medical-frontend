"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/reduxs/hooks";
import InfoComponents from "@/components/InfoComponent";
import TestComponents from "@/components/TestComponent";

const TestHistoryPage = () => {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const router = useRouter();
  React.useEffect(() => {
    if (!wallet || !web3Provider) {
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
      {wallet && <InfoComponents address={wallet.address} />}

      <br />
      {wallet && <TestComponents address={wallet.address} />}
    </div>
  );
};

export default TestHistoryPage;
