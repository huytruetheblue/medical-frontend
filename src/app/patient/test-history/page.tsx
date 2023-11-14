"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/reduxs/hooks";
import TestComponents from "@/components/TestComponent";

const TestHistoryPage = () => {
  const { address } = useAppSelector((state) => state.address);
  const { role } = useAppSelector((state) => state.account);
  const router = useRouter();
  React.useEffect(() => {
    if (!address || !role) {
      router.push("/");
    }
  });
  return <div>{address && <TestComponents address={address} />}</div>;
};

export default TestHistoryPage;
