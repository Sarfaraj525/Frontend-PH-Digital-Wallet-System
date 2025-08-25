import AgentDashboard from "@/pages/Agent/Dashboard";
import CashIn from "@/pages/Agent/CashIn";
import CashOut from "@/pages/Agent/CashOut";
// import Transactions from "@/pages/Agent/Transactions"; // optional, create if you want separate page
import Profile from "@/pages/Agent/Profile"; // create separate AgentProfile if needed
import type { ISidebarItem } from "@/types";

export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      { title: "Overview", url: "/agent/dashboard", component: AgentDashboard },
      { title: "Cash In", url: "/agent/cash-in", component: CashIn },
      { title: "Cash Out", url: "/agent/cash-out", component: CashOut },
      // { title: "Transactions", url: "/agent/transactions", component: Transactions },
      { title: "Profile", url: "/agent/profile", component: Profile },
    ],
  },
];
