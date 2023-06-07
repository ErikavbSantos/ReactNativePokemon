import { StatusBar } from 'expo-status-bar';
import {} from 'react-native';
import Main from './src/screens/Main';
export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#2F48D4" barStyle="light-content" />
      <Main />
    </>
  );
}