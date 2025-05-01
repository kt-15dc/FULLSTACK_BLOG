import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { PrimaryButton, OutlineButton } from "./Button";

const NavBar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 mb-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between lg:mx-[120px] mx-6 p-4">
        <a href="/" className="text-2xl font-medium text-[#26231E]">
          FEI<span className="text-green-500">.</span>
        </a>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex space-x-4">
        <OutlineButton>Log in</OutlineButton>
          <PrimaryButton>Sign up</PrimaryButton>
          
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 cursor-pointer">
                <Menu className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="sm:hidden w-screen left-0 mt-2 space-y-4 py-6 px-6 bg-white/90 backdrop-blur-md border border-gray-200 shadow-md rounded-none text-center">
              {/* <DropdownMenuLabel className="text-lg">Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2">
                <DropdownMenuItem asChild>
                  <a href="/" className="block w-full py-2 text-base text-gray-700 hover:text-black hover:bg-[#e6e3df] rounded-md transition-colors">Home</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/about" className="block w-full py-2 text-base text-gray-700 hover:text-black hover:bg-[#e6e3df] rounded-md transition-colors">About</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/services" className="block w-full py-2 text-base text-gray-700 hover:text-black hover:bg-[#e6e3df] rounded-md transition-colors">Services</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/contact" className="block w-full py-2 text-base text-gray-700 hover:text-black hover:bg-[#e6e3df] rounded-md transition-colors">Contact</a>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator /> */}
              <div className="space-x-4 pt-2">
              <OutlineButton>Log in</OutlineButton>
              <PrimaryButton>Sign up</PrimaryButton>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
