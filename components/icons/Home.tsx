import { House } from 'lucide-react';
import React from 'react';

type Props = { selected: boolean };

function Home({ selected }: Props) {
  return <House color="white" strokeWidth={1.3} seed={selected ? 0 : 0} />;
}

export default Home;
