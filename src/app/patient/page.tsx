"use client";

import InfoComponents from "@/components/InfoComponent";

import { useAppSelector } from "@/reduxs/hooks";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { address } = useAppSelector((state) => state.address);
  const { role } = useAppSelector((state) => state.account);
  const router = useRouter();
  React.useEffect(() => {
    if (!role) {
      router.push("/");
    }
  });

  return <div>{address && <InfoComponents address={address} />}</div>;
}
