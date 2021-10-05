import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { chatsReducer } from './chats/reducer';
import { messagesReducer } from './messages/reducer';
import { profileReducer } from './profile/reducer';
import { articleReducer } from './article/reducer';
import { authReducer } from './Auth/reducer';

const persistConfig = {
    key: 'nr0310',
    storage,
}



const rootReducer = combineReducers({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    article: articleReducer,
    auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__RRDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);