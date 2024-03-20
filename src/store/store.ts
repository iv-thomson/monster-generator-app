import { configureStore } from '@reduxjs/toolkit';

import { CreatureEditorState, creatureEditorReducer } from './creatureEditor';
import { LoginState, loginReducer } from './login';
import { LocationState, locationReducer } from './location';

export const store = configureStore<RootState>({
  reducer: {
    creatureEditor: creatureEditorReducer,
    loginState: loginReducer,
    location: locationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  creatureEditor: CreatureEditorState;
  loginState: LoginState;
  location: LocationState;
};
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
