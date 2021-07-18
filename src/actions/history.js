export const dispatchHistory = (stories) => {
  return {
    type: "GET_HISTORY",
    payload: stories,
  };
};
