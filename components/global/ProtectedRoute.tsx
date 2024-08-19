'use client';
import useUser from '@/lib/hooks/useUser';
import React from 'react';

type Props = { children: React.ReactNode };
const ProtectedRoute = ({ children }: Props) => {
  const { user } = useUser();
  return <>{user ? <>{children}</> : ''}</>;
};

export default ProtectedRoute;
