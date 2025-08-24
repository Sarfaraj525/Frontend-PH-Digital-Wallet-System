
import Dashboard from "@/pages/User/Dashboard";
import Deposit from "@/pages/User/Deposit";
import Profile from "@/pages/User/Profile";
// import Profile from "@/pages/User/Profile";
import SendMoney from "@/pages/User/SendMoney";
import TransactionHistory from "@/pages/User/TransactionHistory";
import Withdraw from "@/pages/User/Withdraw";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      { title: "Overview", url: "/user/dashboard", component: Dashboard },
      { title: "Deposit", url: "/user/deposit", component: Deposit },
      { title: "Withdraw", url: "/user/withdraw", component: Withdraw },
      { title: "Send Money", url: "/user/send-money", component: SendMoney },
      { title: "Transactions", url: "/user/transactions", component: TransactionHistory },
      { title: "Profile", url: "/user/profile", component: Profile },
    ],
  },
];
