/* state selectors */

export const getIsUserLoggedIn = state => state.authReducer.isUserLoggedIn;
export const getAuthIsLoading = state => state.authReducer.isLoading;
