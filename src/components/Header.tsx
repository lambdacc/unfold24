// src/components/Header.tsx
import { ConnectButton } from "@mysten/dapp-kit";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const account = useCurrentAccount();

  const commonMenuItems = [
    { label: "Documentation", link: "/docs" },
    { label: "Terms and Conditions", link: "/terms" },
    { label: "How it works", link: "/how-it-works" },
  ];

  const connectedOnlyItems = [
    { label: "Risks Bought", link: "/risks-bought" },
    { label: "Risks Sold", link: "/risks-sold" },
  ];

  const menuItems = account
    ? [...connectedOnlyItems, ...commonMenuItems]
    : commonMenuItems;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            RiskHarbor
          </Link>

          <div className="flex items-center space-x-4">
            <ConnectButton className="bg-white text-primary hover:bg-gray-100 border border-input" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {menuItems.map((item, index) => (
                  <DropdownMenuItem key={index}>
                    <Link to={item.link} className="w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
