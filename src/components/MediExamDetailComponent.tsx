import { MedicalExamination, PrescriptionInfo } from "@/_types_";

interface MediExamDetailProps {
  address: string;
  index: number;
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MedicalExaminationContract from "@/contracts/MedicalExaminationContract";
import PrescriptionContract from "@/contracts/PrescriptionContract";
import { useAppSelector } from "@/reduxs/hooks";
import React from "react";

const MediExamDetailComponents: React.FC<MediExamDetailProps> = ({
  address,
  index,
}) => {
  const { web3Provider } = useAppSelector((state) => state.account);
  const [medicalExamination, setMedicalExamination] =
    React.useState<MedicalExamination>();
  const [prescription, setPrescription] = React.useState<PrescriptionInfo[]>(
    []
  );
  const getPrecriptionDetail = React.useCallback(async () => {
    if (!web3Provider) {
      return;
    }

    const medicalExaminationContract = new MedicalExaminationContract(
      web3Provider
    );
    const medicalExamination =
      await medicalExaminationContract.getMedicalExamination(address, index);
    setMedicalExamination(medicalExamination);
    const prescriptionContract = new PrescriptionContract(web3Provider);
    const prescription = await prescriptionContract.getPrescription(
      address,
      index
    );
    setPrescription(prescription);
  }, [web3Provider]);

  React.useEffect(() => {
    getPrecriptionDetail();
  });

  return (
    <div>
      <div className="shadow-lg shadow-gray-500/50">
        <div className="mt-6 border-t border-gray-100 container mx-auto ">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Triệu chứng
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {medicalExamination?.sympton}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Chuẩn đoán
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {medicalExamination?.diagnostic}
            </dd>
          </div>
        </div>
      </div>
      <br />
      <div className="shadow-lg shadow-gray-500/50">
        <Table>
          <TableCaption className="pb-6">
            Đơn thuốc ngày {medicalExamination?.date.toDateString()}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tên thuốc</TableHead>
              <TableHead>Liều lượng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescription?.map((pres: PrescriptionInfo, i: number) => {
              return (
                <TableRow key={i}>
                  <TableCell>{pres.medicineName}</TableCell>
                  <TableCell>{pres.medicineDosage}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MediExamDetailComponents;
