import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/components/Layout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '首页', icon: 'Odometer' }
      },
      {
        path: 'asset/catalog',
        name: 'AssetCatalog',
        component: () => import('@/views/AssetCatalog.vue'),
        meta: { title: '数据目录', icon: 'Document' }
      },
      {
        path: 'asset/register',
        name: 'AssetRegister',
        component: () => import('@/views/AssetRegister.vue'),
        meta: { title: '资产登记', icon: 'EditPen' }
      },
      {
        path: 'asset/review',
        name: 'AssetReview',
        component: () => import('@/views/AssetReview.vue'),
        meta: { title: '资产审核', icon: 'Checked' }
      },
      {
        path: 'asset/list',
        name: 'AssetList',
        component: () => import('@/views/AssetList.vue'),
        meta: { title: '资产管理', icon: 'FolderOpened' }
      },
      {
        path: 'share/apply',
        name: 'ShareApply',
        component: () => import('@/views/ShareApply.vue'),
        meta: { title: '共享申请', icon: 'Share' }
      },
      {
        path: 'share/approve',
        name: 'ShareApprove',
        component: () => import('@/views/ShareApprove.vue'),
        meta: { title: '共享审批', icon: 'Guide' }
      },
      {
        path: 'share/record',
        name: 'ShareRecord',
        component: () => import('@/views/ShareRecord.vue'),
        meta: { title: '共享记录', icon: 'Clock' }
      },
      {
        path: 'security/policy',
        name: 'SecurityPolicy',
        component: () => import('@/views/SecurityPolicy.vue'),
        meta: { title: '安全策略', icon: 'Shield' }
      },
      {
        path: 'security/log',
        name: 'SecurityLog',
        component: () => import('@/views/SecurityLog.vue'),
        meta: { title: '安全日志', icon: 'Tickets' }
      },
      {
        path: 'system/user',
        name: 'SystemUser',
        component: () => import('@/views/SystemUser.vue'),
        meta: { title: '用户管理', icon: 'User' }
      },
      {
        path: 'system/role',
        name: 'SystemRole',
        component: () => import('@/views/SystemRole.vue'),
        meta: { title: '角色管理', icon: 'UserFilled' }
      },
      {
        path: 'system/department',
        name: 'SystemDepartment',
        component: () => import('@/views/SystemDepartment.vue'),
        meta: { title: '部门管理', icon: 'OfficeBuilding' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth !== false && !token && to.path !== '/login') {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
