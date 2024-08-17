"use client";
import { ModeToggle } from "@/components/global/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { menuOptions } from "@/lib/constant";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Signout from "../icons/Signout";
import Setting from "../icons/Setting";
import { BadgeDollarSign } from "lucide-react";

type Props = {};

const MenuOptions = (props: Props) => {
  const pathName = usePathname();

  return (
    <nav className=" bg-black  h-screen justify-between flex items-center flex-col  gap-10 py-6 px-2">
      <div className="flex items-center justify-center flex-col gap-8">
        <Link className="flex font-semibold flex-row text-white" href="/dashboard">
        <BadgeDollarSign color="white" strokeWidth={1.5} size={28} />
        </Link>
        <TooltipProvider>
          {menuOptions.map((menuItem) => (
            <ul key={menuItem.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <li>
                    <Link
                      href={menuItem.href}
                      className={clsx(
                        "group h-[1.3rem] w-[1.3rem] flex items-center justify-center  scale-[1.5] rounded-lg p-[3px]  cursor-pointer",
                        {
                          "bg-dark-main-color  ": pathName === menuItem.href,
                        }
                      )}
                    >
                      <menuItem.Component
                        selected={pathName === menuItem.href}
                      />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black/10 backdrop-blur-xl"
                >
                  <p>{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
        {/* <Separator /> */}
      </div>
      <div className="flex items-center justify-center flex-col gap-8">
      <div className="hover:bg-dark-main-color h-[1.3rem] w-[1.3rem] flex items-center justify-center  scale-[1.5] rounded-lg p-[3px]  cursor-pointer">
          <Setting />
        </div>
        <ModeToggle />
        <div className="hover:bg-dark-main-color h-[1.3rem] w-[1.3rem] flex items-center justify-center  scale-[1.5] rounded-lg p-[3px]  cursor-pointer">
          <Signout />
        </div>
      </div>
    </nav>
  );
};

export default MenuOptions;
