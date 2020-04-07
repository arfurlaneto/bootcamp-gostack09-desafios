import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron.configure({ name: 'modulo06', host: '192.168.0.46' })
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage)
    .connect();

  console.tron = tron;

  tron.clear();
}
