import { NativeBaseProvider, StatusBar} from "native-base";
import { THEME } from './src/styles/theme';
import { useFonts,Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
import { SingIn } from './src/screens/Signin'


import {AuthContextProvider } from './src/context/AuthContext';



export default function App() {
  const[fonstLoaded] = useFonts({Roboto_400Regular, Roboto_500Medium, Roboto_700Bold})
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      {fonstLoaded ? <SingIn/>: <Loading/> }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
