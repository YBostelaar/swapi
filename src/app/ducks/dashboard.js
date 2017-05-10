import createAction from 'services/createAction';

const ITEM_LIST_PENDING = 'ITEM_LIST_PENDING';
const ITEM_LIST_SUCCESS = 'ITEM_LIST_SUCCESS';
const ITEM_LIST_FAILED = 'ITEM_LIST_FAILED';
const ITEM_TYPE_SUCCESS = 'ITEM_TYPE_SUCCESS';

const initialState = {
    data: null,
    item_type: 'people',
    error: false,
    loading: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case ITEM_LIST_SUCCESS:
        return {
            ...state,
            data: payload.results,
            count: payload.count,
            loading: false,
        };
    case ITEM_LIST_FAILED:
        return {
            ...state,
            error: true,
            loading: false,
        };
    case ITEM_LIST_PENDING:
        return {
            ...state,
            loading: true,
            error: false,
        };
    case ITEM_TYPE_SUCCESS:
        return {
            ...state,
            item_type: payload,
        };
    default:
        return state;
    }
};

export const getItemListSuccess = createAction('ITEM_LIST_SUCCESS');
export const getItemListFailed = createAction('ITEM_LIST_FAILED');

export const getItemList = page => (dispatch, getState, api) => {
    dispatch({ type: ITEM_LIST_PENDING });

    api.get({ path: `${getState().dashboard.item_type}`, query: { page } }).then((res) => {
        const mappedRes = {
            ...res,
            results: res.results.map((item) => {
                const fragments = item.url.split('/');
                const itemId = fragments[fragments.length - 2];
                const itemType = fragments[fragments.length - 3];
                return {
                    ...item,
                    id: itemId,
                    type: itemType,
                };
            }),
        };

        dispatch(getItemListSuccess(mappedRes));
    }).catch(() => {
        dispatch(getItemListFailed({
            error: true,
            message: 'Oeps! Er is iets misgegaan. Probeer het later opnieuw.',
        }));
    });
};

export const getItemTypeSuccess = createAction('ITEM_TYPE_SUCCESS');

export const getItemType = type => (dispatch) => {
    dispatch(getItemTypeSuccess(type));
    dispatch(getItemList());
};
