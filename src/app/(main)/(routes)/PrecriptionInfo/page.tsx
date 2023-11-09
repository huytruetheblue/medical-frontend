"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/reduxs/hooks";
import MedicalRecordContract from "@/contracts/MedicalRecordContract";
import React from "react";
import { PatientInfo } from "@/_types_";
import { redirect } from "next/navigation";

const PrecriptionPage = () => {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const [patientInfo, setPatientInfo] = React.useState<PatientInfo>();
  const getPrecriptions = React.useCallback(async () => {
    if (!web3Provider || !wallet) {
      redirect("/");
    }
    const medicalRecordContract = new MedicalRecordContract(web3Provider);
    const patient: PatientInfo = await medicalRecordContract.getInfomation(
      wallet.address
    );
    setPatientInfo(patient);
  }, [web3Provider, wallet]);
};
