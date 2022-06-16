import { configureStore } from "@reduxjs/toolkit";
import chainsReducer from "../features/chains/chainsSlice";
import modalsReducer from "../features/modals/modalsSlice";
const store = configureStore({
  reducer: {
    chains: chainsReducer,
    modals: modalsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
