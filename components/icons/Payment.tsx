import { CreditCard } from 'lucide-react'
import React from 'react'

type Props = { selected: boolean }

function Payment({ selected }: Props) {
  return (
    <CreditCard  color='white' strokeWidth={1.3} />
  )
}

export default Payment