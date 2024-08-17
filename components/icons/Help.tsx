import { HelpCircle } from 'lucide-react';
import React from 'react';

function Help({ className, color }: { className: string; color: string }) {
  return <HelpCircle color={color} className={className} />;
}

export default Help;
