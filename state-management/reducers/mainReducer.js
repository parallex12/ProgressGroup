import { ADMIN_DATA } from "../types/types";

const initialState = {
  admin_data: null,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_DATA:
      return {
        ...state,
        admin_data: action.payload,
      };

    default:
      return state;
  }
};
export default mainReducer;
