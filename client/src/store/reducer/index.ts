import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer  from "./authReducer"
import estateReducer from "./authReducer"
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {FLUSH, PAUSE, PERSIST, PURGE,REGISTER,REHYDRATE,} from "redux-persist";

const rootReducer  = combineReducers({
  user:userReducer,
  estate:estateReducer
}) 

const presistConfig = {
  key:"root",
  storage,
  version: 1,
}

const persistedReducer = persistReducer(presistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType< typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch