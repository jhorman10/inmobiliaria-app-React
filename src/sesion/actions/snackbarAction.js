export const snackbarMessage = (dispatch, openMessage) => {
  dispatch({
    type: "OPEN_SNACKBAR",
    openMessage: openMessage,
  });
};
