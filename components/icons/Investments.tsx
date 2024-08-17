import { Landmark } from 'lucide-react';
import React from 'react';

type Props = { selected: boolean };

function Investments({ selected }: Props) {
  return <Landmark color="white" strokeWidth={1.3} seed={selected ? 0 : 0} />;
}

export default Investments;