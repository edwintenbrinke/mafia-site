export default [
  {
    path: '/page',
    component: () => import('@/views/pages/Index'),
    children: [
      {
        name: 'Login',
        path: 'login',
        meta: { authRequired: false },
        component: () => import('@/views/pages/Login'),
      },
      {
        name: 'request_password_reset',
        path: '/password/reset',
        meta: { authRequired: false },
        component: () => import('@/views/pages/RequestPasswordReset'),
      },
      {
        name: 'password_reset',
        path: '/password/reset/:id',
        meta: { authRequired: false },
        component: () => import('@/views/pages/PasswordReset'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/views/dashboard/Index'),
    children: [
      // Admin
      // {
      //   name: 'admin',
      //   path: 'admin/',
      //   meta: { authRequired: true, admin: true },
      //   component: () => import('@/views/dashboard/admin/Index'),
      //   children: [
      //     {
      //       name: 'organization',
      //       path: 'organization',
      //       meta: { authRequired: true, admin: true, display_name: 'page.admin.organization' },
      //       component: () => import('@/views/dashboard/admin/organization/All'),
      //     }
      //   ],
      // },
      // Dashboard
      {
        name: 'dashboard',
        path: '',
        meta: { authRequired: true },
        component: () => import('@/views/dashboard/Dashboard'),
      },
      {
        name: 'test',
        path: 'test',
        meta: { authRequired: true },
        component: () => import('@/views/dashboard/Test'),
      },
    ],
  },
  {
    path: '*',
    component: () => import('@/views/pages/Index'),
    children: [
      {
        name: '404 Error',
        path: '',
        meta: { authRequired: false },
        component: () => import('@/views/pages/Error'),
      },
    ],
  },
]
