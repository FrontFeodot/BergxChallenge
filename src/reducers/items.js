function items(state = { items: {}, fetchingStatus: '' }, action = null) {
  switch (action.type) {
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return {
        ...state,
        items: action.items,
        fetchingStatus: action.fetchingStatus,
      };
    case 'ITEMS_FETCH_DATA_IN_PROGRESS':
      return { ...state, fetchingStatus: action.fetchingStatus };
    case 'ITEMS_FETCH_DATA_ERROR':
      return { ...state, fetchingStatus: action.fetchingStatus };
    default:
      return state;
  }
}
export default items;
