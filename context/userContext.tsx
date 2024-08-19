'use client';
import React, { createContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCookies } from '@/lib/getCookies';

interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    async function checkUser() {
      const cookies = await getCookies();
      if (cookies) {
        setUser(cookies);
      } else {
        router.push('/login');
      }
    }
    checkUser();
    effectRan.current = true;
  }, [router]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
export default UserContext;
