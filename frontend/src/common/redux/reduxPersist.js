import { persistStore } from 'redux-persist';
import store from './index'

const persistor = persistStore(store)

export default persistor