import React, { createContext, ReactNode ,useState, useEffect} from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps{
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps{
    user: UserProps;
    isUserLoading:boolean;

    singIn: () => Promise<void>;
}

interface AuthProviderProps{
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request,response,pormptAsync] = Google.useAuthRequest({
        clientId: '109855768275-0j8caserjh7sh7eni4volnu6qovdab9j.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: ['profile', 'email']
    });
    
    async function singIn(){
        try {
            setIsUserLoading(true);
            await pormptAsync();
        } catch (error) {
            console.log(error);
            throw error;
        }finally{
            setIsUserLoading(false);
        }
    }

    async function singInWithGoogle(access_token: string){
        console.log("Token de autenticação ===> ", access_token);
    }

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken){
            singInWithGoogle(response.authentication.accessToken)
        }
    },[response]);

    return(
        <AuthContext.Provider value={{
            singIn,
            isUserLoading, 
            user,
        }}>
            {children}

        </AuthContext.Provider>

    )
}