export const useUserStore = (set) => ({
  // user information & data
  isAuthenticated: false,
  userData: {},
  userStatus: "typing", //user statuses: "typing, idle"
  setIsAuthenticated: (status) =>
    set({
      isAuthenticated: status,
    }),
  setUserStatus: (status) =>
    set({
      userStatus: status,
    }),
});
