import { Button, ButtonProps } from "../ui/button";

interface IProps extends ButtonProps {}
export default function ConnectWallet({ ...props }: IProps) {
  return (
    <Button variant="default" {...props}>
      Connect Wallet
    </Button>
  );
}
