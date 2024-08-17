/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import Help from '@/components/icons/Help';
import { useTheme } from 'next-themes';

function index() {
  const { theme } = useTheme();
  const pathName = usePathname();

  const color = theme == String('dark') ? 'black' : 'white';
  return (
    <div className="flex w-full flex-row items-center justify-between gap-6 px-4 py-4">
      <h2 className="text-2xl font-extrabold text-black dark:text-white">
        {pathName.replace('/', '').charAt(0).toUpperCase() +
          pathName.replace('/', '').slice(1)}
      </h2>
      <span className="flex h-8 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 hover:bg-gray-700 dark:bg-white">
        <Help color={color} className={`h-4 w-4`} />
        <div className="bg-transparent p-0 text-sm font-normal text-white hover:bg-transparent dark:text-black">
          Help
        </div>
      </span>
    </div>
  );
}

export default index;
