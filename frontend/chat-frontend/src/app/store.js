import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userSlice from "../features/userSlice";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter"
import { persistStore, persistReducer } from "redux-persist";
const saveUserOnlyFilter=createFilter('user', ["user"])

//persist config
const persistConfig = {
    key: "user",
    storage,
    whitelist: ["user"],
    transforms:[saveUserOnlyFilter]
}

const rootReducer = combineReducers({
    user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
          getDefaultMiddleware({
            serializableCheck: false,
          })
})

export const persistor = persistStore(store);
