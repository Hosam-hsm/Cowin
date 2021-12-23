import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import RootNavigator from './navigation';
import { persistor, store } from './store';

const App = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <RootNavigator/>
        </PersistGate>
      </Provider>
    );
};

export default App;
