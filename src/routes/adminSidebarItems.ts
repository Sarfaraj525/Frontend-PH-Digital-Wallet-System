import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems : ISidebarItem[] = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component: Analytics,
        },
        ],
    },
  
  ];


// import type { ISidebarItem } from "@/types";

// export const adminSidebarItems: ISidebarItem[] = [
//   {
//     title: "Dashboard",
//     items: [
//       { title: "Analytics", url: "/admin/analytics", component: Analytics },
//     ],
//   },
//   {
//     title: "Management",
//     items: [
//       { title: "Manage Users", url: "/admin/users", component: ManageUsers },
//       { title: "Manage Agents", url: "/admin/agents", component: ManageAgents },
//     ],
//   },
//   {
//     title: "Transactions",
//     items: [
//       { title: "All Transactions", url: "/admin/transactions", component: Transactions },
//     ],
//   },
//   {
//     title: "System",
//     items: [
//       { title: "Settings", url: "/admin/settings", component: Settings },
//       { title: "Profile", url: "/admin/profile", component: Profile },
//     ],
//   },
// ];
