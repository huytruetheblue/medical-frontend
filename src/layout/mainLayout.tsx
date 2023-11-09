"use client";
declare var window: any;

import { ConnectWallet, WalletInfo } from "@/components/wallet";
import { useAppDispatch, useAppSelector } from "@/reduxs/hooks";
import {
  setWalletInfo,
  setWeb3Provider,
  clearState,
} from "@/reduxs/accounts/account.slices";
import { ethers } from "ethers";
import React, { ReactNode } from "react";
import { menus } from "@/constants";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
export function MainLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { wallet } = useAppSelector((state) => state.account);

  const onConnectMetamask = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        undefined
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const bigBalance = await signer.getBalance();
      const bnbBalance = Number.parseFloat(
        ethers.utils.formatEther(bigBalance)
      );
      dispatch(setWalletInfo({ address, bnb: bnbBalance }));
      dispatch(setWeb3Provider(provider));
    }
  };

  const disconnectMetamask = async () => {
    if (window.ethereum) {
      dispatch(clearState());
    }
  };

  return (
    <div className="space-y-4 h-full w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <div>
        <div className="w-full text-center uppercase text-3xl font-bold text-zinc-500 dark:text-secondary/70">
          MEDICAL RECORD MANAGEMENT
        </div>
        <div className="absolute right-3 top-3">
          {!wallet && <ConnectWallet onClick={onConnectMetamask} />}
          {wallet && (
            <WalletInfo
              address={wallet?.address}
              amount={wallet?.bnb || 0}
              onClick={disconnectMetamask}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-4">
            {menus.map((menu) => (
              // eslint-disable-next-line react/jsx-key
              <NavigationMenuItem className="px-2">
                <Link href={menu.url} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {menu.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {children}
    </div>
  );
}
