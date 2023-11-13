"use client";

import { useEffect, useState } from "react";
import CreateRecordModal from "../modal/CreateRecordModal";
import CreateTestRecordModal from "../modal/CreateTestRecordModal";
import CreateVaccinRecordModal from "../modal/CreateVaccinRecordModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateRecordModal />
      <CreateTestRecordModal />
      <CreateVaccinRecordModal />
    </>
  );
};
