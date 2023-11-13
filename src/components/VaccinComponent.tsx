import { VaccinationInfo } from "@/_types_";

interface VaccinProps {
  address: string;
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

import VaccinationContract from "@/contracts/VaccinationContract";
import { useAppSelector } from "@/reduxs/hooks";
import React from "react";

const VaccinComponents: React.FC<VaccinProps> = ({ address }) => {
  const { web3Provider } = useAppSelector((state) => state.account);

  const [vaccination, setVaccination] = React.useState<VaccinationInfo[]>([]);
  const getVaccination = React.useCallback(async () => {
    try {
      const vaccinationContract = new VaccinationContract(web3Provider);
      const vaccin = await vaccinationContract.getVaccinHistory(address);
      setVaccination(vaccin);
    } catch (err) {
      console.log(err);
    }
  }, [web3Provider]);

  React.useEffect(() => {
    getVaccination();
  }, [getVaccination]);

  return (
    <div className="shadow-lg shadow-gray-500/50">
      <Table>
        <TableCaption className="pb-6">Lịch sử Tiêm chủng</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Loại Vaccin</TableHead>
            <TableHead>Tên vaccin</TableHead>
            <TableHead>Ngày tiêm chủng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vaccination?.map((vaccin: VaccinationInfo, i: number) => {
            return (
              <TableRow key={i}>
                <TableCell>{vaccin.vaccineType}</TableCell>
                <TableCell>{vaccin.vaccineName}</TableCell>
                <TableCell>{vaccin.date.toDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default VaccinComponents;
