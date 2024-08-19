'use server';

import { decodeJwtToken } from '@/utils/api/token';
import { cookies } from 'next/headers';

export const getCookies = async () => {
  const token = await cookies().get('token');
  const dedcodedToken = await decodeJwtToken(token?.value as string);
  if (dedcodedToken) {
    return dedcodedToken;
  } else {
    await cookies().delete('token');
    return false;
  }
};
