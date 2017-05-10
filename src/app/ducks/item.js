import createAction from 'services/createAction';

const ITEM_PENDING = 'ITEM_PENDING';
const ITEM_SUCCESS = 'ITEM_SUCCESS';
const ITEM_FAILED = 'ITEM_FAILED';

const initialState = {
    data: null,
    error: false,
    loading: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
    case ITEM_SUCCESS:
        return {
            ...state,
            data: payload,
            loading: false,
        };
    case ITEM_FAILED:
        return {
            ...state,
            error: true,
            loading: false,
        };
    case ITEM_PENDING:
        return {
            ...state,
            data: null,
            loading: true,
            error: false,
        };
    default:
        return state;
    }
};

export const getItemSuccess = createAction('ITEM_SUCCESS');
export const getItemFailed = createAction('ITEM_FAILED');

export const getItem = (type, id) => (dispatch, getState, api) => {
    dispatch({ type: ITEM_PENDING });

    api.get({ path: `${type}/${id}` }).then((res) => {
        console.log(res);
        dispatch(getItemSuccess(res));
    }).catch(() => {
        dispatch(getItemFailed({
            error: true,
            message: 'Oeps! Er is iets misgegaan. Probeer het later opnieuw.',
        }));
    });
};
