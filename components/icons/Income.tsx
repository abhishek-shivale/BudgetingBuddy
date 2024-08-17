import { HandCoins } from 'lucide-react';
import React from 'react';

type Props = { selected: boolean };

function Income({ selected }: Props) {
  return <HandCoins color="white" strokeWidth={1.3} seed={selected ? 0 : 0} />;
}

export default Income;
