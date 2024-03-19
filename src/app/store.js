import { combineReducers, configureStore } from '@reduxjs/toolkit'
import graphReducer from '../features/graph/graphReducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { composeWithDevTools } from '@redux-devtools/extension'
// import { composeWithDevTools } from '@redux-devtools/extension/lib/types/logOnly'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['contextMenu']
}

const rootReducer = combineReducers({
    graph: persistReducer(persistConfig, graphReducer)
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
