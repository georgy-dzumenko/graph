import { combineReducers, configureStore } from '@reduxjs/toolkit'
import graphReducer from '../features/graph/graphReducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { composeWithDevTools } from '@redux-devtools/extension'
import interfaceReducer from '../features/graph/interfaceReducer'
// import { composeWithDevTools } from '@redux-devtools/extension/lib/types/logOnly'

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
