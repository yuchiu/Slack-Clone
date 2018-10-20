/* state selectors */
export const getCurrentUser = state => state.userReducer.currentUser;

export const getUserIsLoading = state => state.userReducer.isLoading;

export const getUsername = state => {
  const currentUser = getCurrentUser(state);
  return currentUser.username;
};
