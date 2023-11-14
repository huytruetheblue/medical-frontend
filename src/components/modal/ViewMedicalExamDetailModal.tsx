"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import React from "react";
import { useAppSelector } from "@/reduxs/hooks";
import { useModal } from "@/reduxs/use-modal-store";

const ViewMedicalExamDetailModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const { web3Provider } = useAppSelector((state) => state.account);
  const { address, index } = data;

  const isModalOpen = isOpen && type === "createVaccinRecord";

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black py-5 px-10 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Thêm Lịch Sử Tiêm Vaccin
          </DialogTitle>
        </DialogHeader>
        <FormItem>
          <FormLabel>Public Key</FormLabel>
          <FormControl>
            <Input
              readOnly={true}
              placeholder="Public Key"
              value={address!.toString()}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </DialogContent>
    </Dialog>
  );
};
export default ViewMedicalExamDetailModal;
