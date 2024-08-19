import React from 'react'
import { BotIcon } from 'lucide-react'

type Props = { selected: boolean };

function Ai({ selected }: Props) {
  return (
   <BotIcon color="white" strokeWidth={1.3} seed={selected ? 0 : 0}  />
  ) 
}

export default Ai