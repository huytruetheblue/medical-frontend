interface TestProps {
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

import React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/reduxs/hooks";
import { TestInfo } from "@/_types_";
import TestHistoryContract from "@/contracts/TestHistoryContract";

const TestComponents: React.FC<TestProps> = ({ address }) => {
  const { web3Provider } = useAppSelector((state) => state.account);
  const [testHistory, setTestHistory] = React.useState<TestInfo[]>([]);
  const router = useRouter();

  const getTestHistory = React.useCallback(async () => {
    const testHistoryContract = new TestHistoryContract(web3Provider);
    const test = await testHistoryContract.getTestHistory(address);
    setTestHistory(test);
  }, [web3Provider]);

  React.useEffect(() => {
    getTestHistory();
  }, [getTestHistory]);
  return (
    <div className="shadow-lg shadow-gray-500/50">
      <Table>
        <TableCaption className="pb-6">Lịch sử Xét nghiệm</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tên xét nghiệm</TableHead>
            <TableHead>Kết quả</TableHead>
            <TableHead>Ngày xét nghiệm</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testHistory?.map((test: TestInfo, i: number) => {
            return (
              <TableRow key={i}>
                <TableCell>{test.testName}</TableCell>
                <TableCell>{test.testResult}</TableCell>
                <TableCell>{test.date.toDateString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TestComponents;
