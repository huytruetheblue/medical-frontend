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

export default function Home() {
  const { web3Provider, wallet } = useAppSelector((state) => state.account);

  return (
    <div>
      <div>Thông tin bệnh nhân:</div>
      <div>Họ và tên:</div>
      <div>Địa chỉ:</div>
      <div>Ngày sinh:</div>
      <div>Giới tính:</div>
      <div>Số điện thoại:</div>

      <Table>
        <TableCaption>Lịch sử tiêm chủng</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[700px]">Tên thuốc</TableHead>
            <TableHead>Liều lượng</TableHead>
            <TableHead>Ngày tiêm</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>vaccineName</TableCell>
            <TableCell>vaccineAmount</TableCell>
            <TableCell>date</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>vaccineName</TableCell>
            <TableCell>vaccineAmount</TableCell>
            <TableCell>date</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div>Triệu chứng ......sympton</div>
      <div>Chuẩn đoán ........diagnostic</div>
      <Table>
        <TableCaption>Đơn thuốc ngày ..........</TableCaption>
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
}
