"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import VaccinationContract from "@/contracts/VaccinationContract";

const formSchema = z.object({
  vacType: z.string({
    required_error: "Phải nhập loại kiểm tra",
  }),
  vacName: z.string({
    required_error: "Phải nhập kết quả",
  }),
});

const CreateVaccinRecordModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();
  const { address } = useAppSelector((state) => state.address);
  const { web3Provider, wallet } = useAppSelector((state) => state.account);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      publicKey: address,
      vacType: "",
      vacName: "",
    },
  });

  const isModalOpen = isOpen && type === "createTestRecord";

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const vaccinationContract = new VaccinationContract(web3Provider);
      const result = await vaccinationContract.addVaccin(
        address!,
        values.vacType,
        values.vacName
      );
      console.log(result);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black py-5 px-10 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Thêm Lịch Sử Tiêm Vaccin
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormItem>
              <FormLabel>Public Key</FormLabel>
              <FormControl>
                <Input
                  readOnly={true}
                  placeholder="Public Key"
                  value={address}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormField
              control={form.control}
              name="vacType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại Vaccin</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="capitalize"
                      placeholder="Loại Vaccin"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vacName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên Vaccin</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Kết quả xét nghiệm"
                      className="capitalize"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="px-6 py-2">
              <Button
                type="submit"
                className="bg-gray-500 border-2 border-gray-700/50 shadow-md">
                Thêm Vaccin
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateVaccinRecordModal;
