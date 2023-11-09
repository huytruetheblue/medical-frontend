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
import PrescriptionContract from "@/contracts/PrescriptionContract";
import React from "react";
import { redirect } from "next/navigation";
import { MedicalExamination, PatientInfo } from "@/_types_";
import MedicalExaminationContract from "@/contracts/MedicalExaminationContract";

interface PrecriptionDetailProps {
  params: {
    address: String;
    index: Number;
  };
}

const PrecriptionDetailPage = ({ params }: PrecriptionDetailProps) => {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const [patientInfo, setPatientInfo] = React.useState<PatientInfo>();
  const [medicalExamination, setMedicalExamination] =
    React.useState<MedicalExamination>();
  const getPrecriptionDetail = React.useCallback(async () => {
    if (!web3Provider || !wallet) {
      redirect("/");
    }
    const medicalRecordContract = new MedicalRecordContract(web3Provider);
    const patient: PatientInfo = await medicalRecordContract.getMedicalRecords(
      params.address
    );
    setPatientInfo(patient);
    const medicalExaminationContract = new MedicalExaminationContract(
      web3Provider
    );
    const medicalExamination =
      await medicalExaminationContract.getMedicalRecord(
        params.address,
        params.index
      );
    setMedicalExamination(medicalExamination);
    const prescriptionContract = new PrescriptionContract(web3Provider);
  }, [web3Provider, wallet]);

  //   React.useEffect(() => {});

  return (
    <div>
      <div className="flex w-[200px]">
        <div>Thông tin bệnh nhân:</div>
      </div>
      <div>
        <div>Họ và tên:</div>
        <div>{patientInfo?.patientName || ""}</div>
      </div>
      <div>
        <div>Địa chỉ:</div>
        <div>{patientInfo?.patientName || ""}</div>
      </div>
      <div>
        <div>Ngày sinh:</div>
        <div>{patientInfo?.patientBirthday.toDateString() || ""}</div>
      </div>
      <div>
        <div>Giới tính:</div>
        <div>{patientInfo?.patientGender || ""}</div>
      </div>
      <div>
        <div>Số điện thoại:</div>
        <div>{patientInfo?.patientNumber || ""}</div>
      </div>
      <div>
        <div>Triệu chứng: {medicalExamination?.sympton}</div>
      </div>
      <div>
        <div>Chuẩn đoán: {medicalExamination?.diagnostic}</div>
      </div>
      <Table>
        <TableCaption>
          Đơn thuốc ngày {medicalExamination?.date.toDateString()}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[700px]">Tên thuốc</TableHead>
            <TableHead>Liều lượng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>vaccineName</TableCell>
            <TableCell>vaccineAmount</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableCaption>Lịch sử xét nghiệm</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[700px]">Tên xét nghiệm</TableHead>
            <TableHead>Kết quả</TableHead>
            <TableHead>Ngày xét nghiệm</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>testName</TableCell>
            <TableCell>testResult</TableCell>
            <TableCell>date</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PrecriptionDetailPage;
