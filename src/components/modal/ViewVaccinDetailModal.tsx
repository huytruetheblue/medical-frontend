"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { useAppSelector } from "@/reduxs/hooks";
import { useModal } from "@/reduxs/use-modal-store";
import { PrescriptionInfo, VaccinationInfo } from "@/_types_";
import VaccinationContract from "@/contracts/VaccinationContract";

const ViewVaccinDetailModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { web3Provider } = useAppSelector((state) => state.account);
  const { address, index } = data;
  const [vaccination, setVaccination] = React.useState<VaccinationInfo[]>([]);

  const isModalOpen = isOpen && type === "openVaccinDetailModal";

  const getPrecriptionDetail = React.useCallback(async () => {
    if (!web3Provider) {
      return;
    }
    try {
      const vaccinationContract = new VaccinationContract(web3Provider);
      const vaccin = await vaccinationContract.getVaccinHistory(address!);
      setVaccination(vaccin);
    } catch (err) {
      console.log(err);
    }
  }, [web3Provider, address, index]);

  React.useEffect(() => {
    getPrecriptionDetail();
  }, [getPrecriptionDetail]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black py-5 px-10 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Thông tin tiêm chủng
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="text-sm font-medium leading-none">Loại Vaccin</div>
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {vaccination[index!]?.vaccineType || ""}
          </div>
          <div className="text-sm font-medium leading-none"> Tên Vaccin</div>
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {vaccination[index!]?.vaccineName || ""}
          </div>
          <div className="text-sm font-medium leading-none">
            Ngày xét nghiệm
          </div>
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {vaccination[index!]?.date.toDateString() || ""}
          </div>
          <div className="text-sm font-medium leading-none">Người Tiêm</div>
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {vaccination[index!]?.sender || ""}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ViewVaccinDetailModal;
