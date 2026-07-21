import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistroScreen from "../screens/RegistroScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GuardarScreen from "../screens/GuardarScreen";
import LeerScreen from "../screens/LeerScreen";
import PerfilScreen from "../screens/PerfilScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Registro" component={RegistroScreen}/>
            <Stack.Screen name="Tabs" component={MyTabs}/>
        </Stack.Navigator>
    )
}

function MyTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Guardar" component={GuardarScreen}/>
            <Tab.Screen name="Leer" component={LeerScreen}/>
            <Tab.Screen name="Perfil" component={PerfilScreen}/>
        </Tab.Navigator>
    )
}

export function Navegador(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}