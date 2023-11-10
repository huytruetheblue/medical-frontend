"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <div>
      <Link href="/">
        <div
          onClick={onClose}
          className={cn(
            "hover:shadow-lg border-2 border-t-slate-100 hover:shadow-gray-500/50 block px-3 py-4 text-sm  font-medium md:text-base"
          )}>
          Xem Bệnh Án Cá Nhân
        </div>
      </Link>
      <Link href="/patient">
        <div
          onClick={onClose}
          className={cn(
            "hover:shadow-lg border-2 border-t-slate-100 hover:shadow-gray-500/50 block px-3 py-4 text-sm  font-medium md:text-base"
          )}>
          Xem Bệnh Án Bệnh Nhân
        </div>
      </Link>
      <Link href="/add-record" onClick={onClose}>
        <div
          onClick={onClose}
          className={cn(
            "hover:shadow-lg border-2 border-t-slate-100 hover:shadow-gray-500/50 block px-3 py-4 text-sm  font-medium md:text-base"
          )}>
          Thêm Bệnh Án Bệnh Nhân
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
