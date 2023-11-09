import { numberFormat, showSortAddress } from "@/utils";
import { Button, ButtonProps } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface IProps extends ButtonProps {
  address?: string;
  amount: number;
}

export default function WalletInfo({ address, amount, ...props }: IProps) {
  return (
    <Button variant="default" {...props}>
      <div>{showSortAddress(address)}</div>
      <Avatar>
        <AvatarImage src="/bnb.png" className="w-5 m-1" />
        <AvatarFallback>BNB</AvatarFallback>
      </Avatar>
      <div>{numberFormat(amount)}</div>
    </Button>
  );
}
