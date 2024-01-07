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
import { MedicalExamination, PrescriptionInfo } from "@/_types_";
import MedicalExaminationContract from "@/contracts/MedicalExaminationContract";

const ViewMedicalExamDetailModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { web3Provider } = useAppSelector((state) => state.account);
  const { address, index } = data;
  const [medicalExamination, setMedicalExamination] =
    React.useState<MedicalExamination>();

  const isModalOpen = isOpen && type === "openExamDetailModal";

  const getPrecriptionDetail = React.useCallback(async () => {
    if (!web3Provider) {
      return;
    }
    try {
      const medicalExaminationContract = new MedicalExaminationContract(
        web3Provider
      );
      const medicalExamination =
        await medicalExaminationContract.getMedicalExamination(
          address!,
          index!
        );
      setMedicalExamination(medicalExamination);
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
            Đơn Thuốc Ngày {medicalExamination?.date.toDateString()}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="text-sm font-medium leading-none">Public Key</div>
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {address || ""}
          </div>
          <div className="text-sm font-medium leading-none">Triệu Chứng</div>
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {medicalExamination?.sympton || ""}
          </div>
          <div className="text-sm font-medium leading-none">Chuẩn Đoán</div>
          <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {medicalExamination?.diagnostic || ""}
          </div>
          <div className="columns-2 pt-4">
            <div className="flex h-10 w-full rounded-md text-sm font-medium leading-none">
              Tên Thuốc
            </div>
            <div className="flex h-10 w-full rounded-md text-sm font-medium leading-none">
              Liều Lượng
            </div>
          </div>
          {medicalExamination?.prescription.map(
            (input: PrescriptionInfo, index) => (
              <div key={index}>
                <div className="columns-2 space-y-4">
                  <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    {input.medicineName}
                  </div>
                  <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    {input.medicineDosage}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ViewMedicalExamDetailModal;
