import { Amplify } from 'aws-amplify';
import amplifyconfig from './aws-exports';
import List from './views/List';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Table from './views/Table';
import { CountriesProvider } from './context/countries';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://8532d3fde79c397998a79a633d6636c1@o4507312635117568.ingest.us.sentry.io/4507312636821504',
  debug: false,
});

Amplify.configure(amplifyconfig);

export type RootStackParamList = {
  List: undefined;
  Table: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <CountriesProvider>
        <Stack.Navigator>
          <Stack.Screen name='List' component={List} options={{ headerShown: false }} />
          <Stack.Screen name='Table' component={Table} options={{}} />
        </Stack.Navigator>
      </CountriesProvider>
    </NavigationContainer>
  );
}

export default Sentry.wrap(App);
