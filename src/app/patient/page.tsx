"use client";

import InfoComponents from "@/components/InfoComponent";
import { InputWithButton } from "@/components/InputWithButton";

import { useAppSelector } from "@/reduxs/hooks";
import React from "react";

export default function Home() {
  const { address } = useAppSelector((state) => state.address);

  return <div>{address && <InfoComponents address={address} />}</div>;
}
