export default defineNuxtRouteMiddleware((to) => {
  const { savedName } = useUserStore()

  // 登录页面放行
  if (to.path === '/login')
    return

  // 未登录跳转登录页面
  if (!savedName)
    return navigateTo('/login')
})
