export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();
  await auth.restore(to);

  //   if (!auth.isLoggedIn) {
  //     return navigateTo("/admin");
  //   }

  //   if (!auth.isAdmin) {
  //     return navigateTo("/client");
  //   }
});
