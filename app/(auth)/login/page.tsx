import { cookies } from 'next/headers';
import Form from './form';

function page() {
  console.log(cookies().get('accessToken'))
  return (
    <main className="relative m-auto flex h-[100vh] w-full flex-col items-center justify-center">
      <div className="absolute inset-x-0 top-[5px] z-10 h-96 overflow-hidden text-gray-900/40 opacity-10 [mask-image:linear-gradient(to_top,transparent,white)]">
        <svg
          className="absolute inset-0 top-0 h-full w-full text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="100%"
              patternTransform="translate(0 -1)"
            >
              <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)"></rect>
        </svg>
      </div>
      <div className="absolute z-50 flex w-[390px] flex-1 flex-col justify-center p-6">
        <p className="text-center text-3xl">Logo Here</p>
        <p className="mb-6 mt-4 text-center text-sm text-gray-600">
          Enter Email and Password For Secure Login.
        </p>
        <Form />
      </div>
      <footer className="className absolute bottom-0 flex h-14 w-full items-center border-t pl-6 pr-6 font-medium">
        <div className="xs:mb-0 flex w-full justify-center">
          <div className="flex flex-row items-center justify-between gap-6 border-t border-white/5">
            <p className="text-xs text-gray-600">
              © Copyright 2024, BudgetingBuddy
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default page;
