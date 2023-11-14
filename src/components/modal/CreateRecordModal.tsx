"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useRouter } from "next/navigation";
import React from "react";
import { useAppSelector } from "@/reduxs/hooks";
import { PatientInfo } from "@/_types_";
import MedicalRecordContract from "@/contracts/MedicalRecordContract";
import { ethers } from "ethers";
import { useModal } from "@/reduxs/use-modal-store";

const isValidAddress = (address: string) => {
  try {
    ethers.utils.getAddress(address);
  } catch (e) {
    return false;
  }
  return true;
};

const formSchema = z.object({
  patientName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  publicKey: z.string().refine(
    (key) => {
      return isValidAddress(key);
    },
    { message: "Public Key không hợp lệ" }
  ),
  patientAddress: z.string({
    required_error: "Bạn phải nhập địa chỉ",
  }),
  patientBirthday: z.date({
    required_error: "Bạn phải nhập ngày tháng năm sinh.",
  }),
  patientGender: z.string({
    required_error: "Bạn phải nhập giới tính",
  }),
  patientNumber: z.string().refine(
    (str) => {
      return /^\d{10}$/.test(str);
    },
    {
      message: "Số điện thoại không hợp lệ",
    }
  ),
});

const CreateRecordModal = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      publicKey: "",
      patientAddress: "",
      patientBirthday: new Date(),
      patientGender: "",
      patientNumber: "",
    },
  });
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createRecord";

  const { web3Provider, wallet } = useAppSelector((state) => state.account);
  const { address } = useAppSelector((state) => state.address);

  const [patientInfo, setPatientInfo] = React.useState<PatientInfo>();

  const getPatientInfo = React.useCallback(async () => {
    if (!web3Provider || !address) {
      setPatientInfo(undefined);
      return;
    }
    try {
      const medicalRecordContract = new MedicalRecordContract(web3Provider);
      const patient: PatientInfo =
        await medicalRecordContract.getMedicalRecords(address);
      setPatientInfo(patient);
    } catch (err) {
      console.log(err);
    }
  }, [web3Provider, address]);

  React.useEffect(() => {
    getPatientInfo();
  }, [getPatientInfo]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const medicalRecordContract = new MedicalRecordContract(web3Provider);
      await medicalRecordContract.addMedicalRecord(
        values.publicKey,
        values.patientName,
        values.patientAddress,
        values.patientBirthday.toLocaleDateString(),
        values.patientGender === "Nam" ? true : false,
        values.patientNumber
      );

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
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black py-5 px-10 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Thêm Bệnh Án Bệnh Nhân
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input
                      className="capitalize"
                      disabled={isLoading}
                      placeholder="Họ và tên"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publicKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Public Key</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Public Key"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="patientAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input
                      className="capitalize"
                      disabled={isLoading}
                      placeholder="Địa chỉ"
                      {...field}
                      defaultValue={address}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="patientBirthday"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={isLoading}
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}>
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="patientGender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Lựa chọn giới tính" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="patientNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Số điện thoại"
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
                Thêm Bệnh Án
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateRecordModal;
