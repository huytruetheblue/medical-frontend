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
import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { IMenu } from "@/_types_";

interface SidebarProps {
  menus: IMenu[];
  isOpenSidebar: boolean;
  setIsOpenSidebar: (i: boolean) => void;
}

const NavigationLayout: React.FC<SidebarProps> = ({
  menus,
  isOpenSidebar,
  setIsOpenSidebar,
}) => {
  const dispatch = useAppDispatch();
  const [isOpenMenu, setIsOpenMenu] = React.useState<Boolean>(false);

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
    <nav className="bg-gray-800 fixed left-0 top-0 w-full z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative "></div>
        {!isOpenSidebar && (
          <button
            type="button"
            className="absolute p-5 left-0 rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        )}
        {isOpenSidebar && (
          <button
            type="button"
            className="absolute p-5 left-0 rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
              />
            </svg>
          </button>
        )}
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Medical Manager"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {menus.map((menu: IMenu, i) => {
                  return (
                    <Link key={i} href={menu.url}>
                      <div
                        className={cn(
                          "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-sm  font-medium md:text-base"
                        )}>
                        {menu.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <div className="relative ml-3">
                <div>
                  <div className="flex-shrink-0">
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
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpenMenu(!isOpenMenu)}>
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpenMenu && (
        <div className="md:hidden" id="mobile-menu">
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              {!wallet && (
                <ConnectWallet className="w-full" onClick={onConnectMetamask} />
              )}
              {wallet && (
                <WalletInfo
                  className="w-full"
                  address={wallet?.address}
                  amount={wallet?.bnb || 0}
                  onClick={disconnectMetamask}
                />
              )}
            </div>
          </div>
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {menus.map((menu: IMenu, i) => {
              return (
                <Link key={i} href={menu.url}>
                  <div
                    className={cn(
                      "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    )}>
                    {menu.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationLayout;
