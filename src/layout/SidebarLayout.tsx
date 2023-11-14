"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <div>
      <Link href="/" className="pb-7">
        <div
          onClick={onClose}
          className={cn(
            "hover:shadow-lg border-2 border-t-slate-100 hover:shadow-gray-500/50 hover:bg-gray-300 block px-3 py-4 text-sm  font-medium md:text-base rounded-[12px]"
          )}>
          Xem Bệnh Án Cá Nhân
        </div>
      </Link>
      <Link href="/patient">
        <div
          onClick={onClose}
          className={cn(
            "hover:shadow-lg border-2 border-t-slate-100 hover:shadow-gray-500/50 hover:bg-gray-300 block px-3 py-4 text-sm font-medium md:text-base rounded-[12px]"
          )}>
          Xem Bệnh Án Bệnh Nhân
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
