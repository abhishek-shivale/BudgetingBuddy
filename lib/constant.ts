import Home from "@/components/icons/Home";
import Expenses from "@/components/icons/Expenses";
import Income from "@/components/icons/Income";
import Investments from "@/components/icons/Investments";
import Payment from "@/components/icons/Payment";

export const menuOptions = [
    { name: 'Dashboard', Component: Home , href: '/dashboard' },
    { name: 'Income', Component: Income, href: '/income' },
    { name: 'Investments', Component: Investments, href: '/investments' },
    { name: 'Expenses', Component: Expenses, href: '/expenses' },
    { name: 'Subscriptions', Component: Payment, href: '/subscriptions' },
  ]