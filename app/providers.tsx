'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}
