import { combineReducers } from "redux";

import user from "./store";

const rootReducer = combineReducers({
  user
});

export default rootReducer;

// export const isLogin = (state) => {
//   return state.auth.accessToken !== null;
// };
