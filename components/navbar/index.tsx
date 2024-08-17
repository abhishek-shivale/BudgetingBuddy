"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Help from "@/components/icons/Help";
import { useTheme } from "next-themes";

function index() {
  const { theme } = useTheme();
  const pathName = usePathname();

  const color = theme == String("dark") ? "black" : "white";
  return (
    <div className="flex flex-row justify-between gap-6 items-center px-4 py-4 w-full ">
      <h2 className="text-2xl font-extrabold text-black dark:text-white">
        {pathName.replace("/", "").charAt(0).toUpperCase() +
          pathName.replace("/", "").slice(1)}
      </h2>
      <span className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 hover:bg-gray-700 h-8 px-3 dark:bg-white cursor-pointer">
        <Help color={color} className={`h-4 w-4`} />
        <div className="bg-transparent hover:bg-transparent p-0 text-white dark:text-black text-sm font-normal">
          Help
        </div>
      </span>
    </div>
  );
}

export default index;
