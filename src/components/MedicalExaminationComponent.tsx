import { MedicalExamination } from "@/_types_";

interface MedicalExaminationProps {
  address: string;
  link: string;
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
import { useAppSelector } from "@/reduxs/hooks";
import { useRouter } from "next/navigation";
import React from "react";

const MedicalExaminationComponents: React.FC<MedicalExaminationProps> = ({
  address,
  link,
}) => {
  const { web3Provider } = useAppSelector((state) => state.account);
  const [medicalExaminations, setMedicalExaminations] =
    React.useState<MedicalExamination[]>();
  const router = useRouter();

  const getMedicalExamination = React.useCallback(async () => {
    if (!web3Provider) {
      return;
    }
    try {
      const medicalExaminationContract = new MedicalExaminationContract(
        web3Provider
      );
      const medicalExaminations =
        await medicalExaminationContract.getAllMedicalExaminations(address);
      setMedicalExaminations(medicalExaminations);
    } catch (err) {
      console.log(err);
    }
  }, [web3Provider]);

  React.useEffect(() => {
    getMedicalExamination();
  });

  return (
    <div className="shadow-lg shadow-gray-500/50">
      <Table>
        <TableCaption className="pb-6">Thông tin khám bệnh</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Triệu chứng</TableHead>
            <TableHead>Chuẩn đoán</TableHead>
            <TableHead>Ngày khám</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicalExaminations?.map((medicalExamination, i) => {
            return (
              <TableRow key={i} onClick={() => router.push(`${link}/${i}`)}>
                <TableCell>{medicalExamination?.sympton}</TableCell>
                <TableCell>{medicalExamination?.diagnostic}</TableCell>
                <TableCell>{medicalExamination?.date.toDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MedicalExaminationComponents;
