import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import graphReducer from '@features/graph/graphReducer'
import interfaceReducer from '@features/interface/interfaceReducer'


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

const rootReducer = combineReducers({
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
