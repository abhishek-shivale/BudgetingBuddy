import { Receipt } from 'lucide-react'
import React from 'react'

type Props = { selected: boolean }


function Expenses({ selected }: Props) {
  return (
    <Receipt color='white' strokeWidth={1.3} />
  )
}

export default Expenses