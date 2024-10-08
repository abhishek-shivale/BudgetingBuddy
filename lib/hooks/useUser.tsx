'use client';
import UserContext from '@/context/userContext';
import { useContext } from 'react';

function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

export default useUser;
