import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import { combineReducers } from 'redux'
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import userReducer from './features/user/userSlice';
  import slotReducer from './features/slot/slotSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

const rootReducer = combineReducers({
    user: persistedUserReducer,
    slot: slotReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export let persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch