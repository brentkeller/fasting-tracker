import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import { fastTransform } from './ducks/fasts';

const persistConfig = {
  key: 'root',
  storage: storage,
  transforms: [fastTransform],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
