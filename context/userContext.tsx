import React from 'react';

function userContext({ children }: Readonly<{ children: React.ReactNode }>) {
  return { children };
}

export default userContext;
