export default [
  // Home
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/home/Home')
  },
  // Pattern
  {
    path: '/pattern/:patternId',
    name: 'pattern',
    component: () => import('@/pages/pattern/Pattern'),
    props: true
  },
  // Login
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/Login')
  },
  // User
  {
    path: '/',
    name: 'user',
    component: () => import('@/pages/user/User')
  },
  // All invalid routes will redirect here
  {
    path: '*',
    redirect: '/'
  }
]
