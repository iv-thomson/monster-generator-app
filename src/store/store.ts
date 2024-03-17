import { configureStore } from '@reduxjs/toolkit';

import { CreatureEditorState, creatureEditorReducer } from './creatureEditor';
import { LoginState, loginReducer } from './login';

export const store = configureStore<RootState>({
  reducer: {
    creatureEditor: creatureEditorReducer,
    loginState: loginReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  creatureEditor: CreatureEditorState;
  loginState: LoginState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
