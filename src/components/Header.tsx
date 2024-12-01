// src/components/Header.tsx
import { ConnectButton } from "@mysten/dapp-kit";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const account = useCurrentAccount();

  const connectedMenuItems = [
    { label: "Disconnect wallet", action: () => {} },
    { label: "Risks Bought", link: "/risks-bought" },
    { label: "Risks Sold", link: "/risks-sold" },
    { label: "Documentation", link: "/docs" },
    { label: "Terms and Conditions", link: "/terms" },
    { label: "How it works", link: "/how-it-works" },
  ];

  const disconnectedMenuItems = [
    { label: "Documentation", link: "/docs" },
    { label: "Terms and Conditions", link: "/terms" },
    { label: "How it works", link: "/how-it-works" },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            RiskHarbor
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              <ConnectButton />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {(account ? connectedMenuItems : disconnectedMenuItems).map(
                (item, index) => (
                  <DropdownMenuItem key={index}>
                    <Link
                      to={item.link || "#"}
                      onClick={item.action}
                      className="w-full"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
