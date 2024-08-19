'use client';
import { ModeToggle } from '@/components/global/mode-toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { menuOptions } from '@/lib/constant';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Signout from '../icons/Signout';
import Setting from '../icons/Setting';
import { BadgeDollarSign } from 'lucide-react';

const MenuOptions = () => {
  const pathName = usePathname();

  return (
    <nav className="flex h-screen flex-col items-center justify-between gap-10 bg-black px-2 py-6">
      <div className="flex flex-col items-center justify-center gap-8">
        <Link
          className="flex flex-row font-semibold text-white"
          href="/dashboard"
        >
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
                        'group flex h-[1.3rem] w-[1.3rem] scale-[1.5] cursor-pointer items-center justify-center rounded-lg p-[3px]',
                        {
                          'bg-dark-main-color': pathName === menuItem.href,
                        },
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
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex h-[1.3rem] w-[1.3rem] scale-[1.5] cursor-pointer items-center justify-center rounded-lg p-[3px] hover:bg-dark-main-color">
          <Setting />
        </div>
        <ModeToggle />
        <div className="flex h-[1.3rem] w-[1.3rem] scale-[1.5] cursor-pointer items-center justify-center rounded-lg p-[3px] hover:bg-dark-main-color">
          <Signout />
        </div>
      </div>
    </nav>
  );
};

export default MenuOptions;
