import { Routes, provideRouter, withDebugTracing } from "@angular/router";

export const pagesRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages.component").then((c) => c.PagesComponent),
    children: [
      {
        path: "invoice",
        loadComponent: () =>
          import("./invoice/invoice.component").then((c) => c.InvoiceComponent),
      },
      {
        path: "profile",
        loadComponent: () =>
          import("./profile/profile.component").then((c) => c.ProfileComponent),
      },
    ],
  },

  // {
  //   path: 'setting-tag',
  //   loadComponent: () =>
  //     import('./setting-tag/setting-tag.component').then(
  //       (c) => c.SettingTagComponent
  //     ),
  // },
];
