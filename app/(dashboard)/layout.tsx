import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* This will contain the enhanced navbar and protected route wrapper */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
