import {
  UI_PRODUCT_LIST_TYPE_GRID,
  RESET_NET_CONNECTION
} from '../actions/types';

const INITIAL_STATE = {
  listTypeGrid: false,
  isConnected:false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UI_PRODUCT_LIST_TYPE_GRID:
      return { ...state, listTypeGrid: action.payload };
      case RESET_NET_CONNECTION:
        return {
          isConnected: action.data,
        };
    default:
      return state;
  }
};
