

import { Provider } from 'react-redux';
import {store} from './src/features/weather/store/store';
import AppNavigator from './src/features/weather/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
