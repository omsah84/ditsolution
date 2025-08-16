export const tabs = [
  {
    key: "courseManagement",
    label: "Course Management",
    subtabs: [
      {
        key: "list-courses",
        label: "List Courses",
        href: "/dashboard/course-management/list-courses",
      },
      {
        key: "add-course",
        label: "Add Course",
        href: "/dashboard/course-management/add-course",
      },
      {
        key: "delete-course",
        label: "Delete Course",
        href: "/dashboard/course-management/delete-course",
      },
      {
        key: "edit-course",
        label: "Edit Course",
        href: "/dashboard/course-management/edit-course",
      },
      {
        key: "add-instructor",
        label: "Add Instructor",
        href: "/dashboard/course-management/add-instructor",
      },
      {
        key: "add-curriculum",
        label: "Add Curriculum",
        href: "/dashboard/course-management/add-curriculum",
      },
      {
        key: "manage-reviews",
        label: "Manage Reviews",
        href: "/dashboard/course-management/manage-reviews",
      },
      {
        key: "add-testimonial",
        label: "Add Testimonial",
        href: "/dashboard/course-management/add-testimonial",
      },
      {
        key: "add-meta",
        label: "Add Meta Information",
        href: "/dashboard/course-management/add-meta",
      },
      {
        key: "add-resources",
        label: "Add Resources",
        href: "/dashboard/course-management/add-resources",
      },
    ],
  },
  {
    key: "userManagement",
    label: "User Management",
    subtabs: [
      {
        key: "students",
        label: "Students",
        href: "/dashboard/user-management/students",
      },
      {
        key: "instructors",
        label: "Instructors",
        href: "/dashboard/user-management/instructors",
      },
      {
        key: "admins",
        label: "Admins",
        href: "/dashboard/user-management/admins",
      },
      {
        key: "roles",
        label: "Roles & Permissions",
        href: "/dashboard/user-management/roles",
      },
    ],
  },
  {
    key: "categoryManagement",
    label: "Category / Content",
    subtabs: [
      {
        key: "categories",
        label: "Categories",
        href: "/dashboard/category-management/categories",
      },
      {
        key: "tags",
        label: "Tags",
        href: "/dashboard/category-management/tags",
      },
      {
        key: "contentBlocks",
        label: "Content Blocks",
        href: "/dashboard/category-management/content-blocks",
      },
    ],
  },
  {
    key: "enrollments",
    label: "Enrollments & Orders",
    subtabs: [
      {
        key: "enrollments",
        label: "Enrollments",
        href: "/dashboard/enrollments/enrollments",
      },
      { key: "orders", label: "Orders", href: "/dashboard/enrollments/orders" },
      {
        key: "invoices",
        label: "Invoices",
        href: "/dashboard/enrollments/invoices",
      },
      {
        key: "transactions",
        label: "Transactions",
        href: "/dashboard/enrollments/transactions",
      },
    ],
  },
  {
    key: "marketing",
    label: "Marketing & Engagement",
    subtabs: [
      {
        key: "promotions",
        label: "Promotions",
        href: "/dashboard/marketing/promotions",
      },
      {
        key: "emails",
        label: "Email Campaigns",
        href: "/dashboard/marketing/emails",
      },
      {
        key: "notifications",
        label: "Notifications",
        href: "/dashboard/marketing/notifications",
      },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    subtabs: [
      {
        key: "general",
        label: "General Settings",
        href: "/dashboard/settings/general",
      },
      {
        key: "payments",
        label: "Payment Settings",
        href: "/dashboard/settings/payments",
      },
      { key: "seo", label: "SEO & Meta", href: "/dashboard/settings/seo" },
      {
        key: "appearance",
        label: "Appearance / Themes",
        href: "/dashboard/settings/appearance",
      },
    ],
  },
  {
    key: "reports",
    label: "Analytics / Reports",
    subtabs: [
      {
        key: "coursePerformance",
        label: "Course Performance",
        href: "/dashboard/reports/course-performance",
      },
      {
        key: "userActivity",
        label: "User Activity",
        href: "/dashboard/reports/user-activity",
      },
      {
        key: "salesRevenue",
        label: "Sales & Revenue",
        href: "/dashboard/reports/sales-revenue",
      },
    ],
  },
];

export type TabItem = (typeof tabs)[number];
export type SubTabItem = TabItem["subtabs"][number];
