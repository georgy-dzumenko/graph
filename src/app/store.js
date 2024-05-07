import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import graphReducer from '@features/graph/graphReducer'
import interfaceReducer from '@features/interface/interfaceReducer'
import authReducer from '@features/auth/authReducer'


const interfacePersistConfig = {
    key: 'interface',
    storage,
    blacklist: ['contextMenu', 'modal']
}

const graphPersistConfig = {
    key: 'graph',
    storage,
    whitelist: ['edges', 'vertexes']
}

const authPersistConfig = {
    key: 'auth',
    storage,
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    graph: persistReducer(graphPersistConfig, graphReducer),
    interface: persistReducer(interfacePersistConfig, interfaceReducer)
})

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage,
        blacklist: ['interface']
    },
    rootReducer
)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
