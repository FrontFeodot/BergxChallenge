export function itemsFetchDataSuccess(items, fetchingStatus) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    items,
    fetchingStatus,
  };
}
export function itemsFetchDataError(fetchingStatus) {
  return {
    type: 'ITEMS_FETCH_DATA_ERROR',
    fetchingStatus,
  };
}
export function itemsFetchDataInProgress(fetchingStatus) {
  return {
    type: 'ITEMS_FETCH_DATA_IN_PROGRESS',
    fetchingStatus,
  };
}
const connectChildToParents = (data, parent = 0) => data
  .filter((item) => item.parent_id === parent)
  .map((child) => ({
    ...child,
    children: connectChildToParents(data, child.id),
  }));

export function itemsFetchData(url) {
  return (dispatch) => {
    dispatch(itemsFetchDataInProgress('Fetching in progress'));
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          dispatch(itemsFetchDataError('Fetching error'));
          throw Error(response.statusText);
        }

        return response;
      })
      .then((response) => response.json())
      .then((items) => {
        dispatch(
          itemsFetchDataSuccess(
            {
              list1: [...items],
              list2: connectChildToParents(items),
            },
            'Fetching success',
          ),
        );
      });
  };
}
