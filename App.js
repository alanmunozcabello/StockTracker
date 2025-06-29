import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RegistroVentaScreen from './screens/RegistroVentaScreen';
import VentasScreen from './screens/VentasScreen';
import { StockProvider } from './context/StockContext';
import AgregarProductoScreen from './screens/AgregarProductoScreen';
import EditarProductoScreen from './screens/EditarProductoScreen';
import { VentasProvider } from './context/VentasContext';
import ConfiguracionesScreen from './screens/ConfiguracionesScreen';
import { ThemeProvider } from './context/ThemeContext';
import * as Notifications from 'expo-notifications';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <ThemeProvider>
      <StockProvider>
        <VentasProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Inicio" component={HomeScreen} options={{headerShown: false}} />
              <Stack.Screen name="RegistrarVenta" component={RegistroVentaScreen} />
              <Stack.Screen name="Ventas" component={VentasScreen} />
              <Stack.Screen name="AgregarProducto" component={AgregarProductoScreen} />
              <Stack.Screen name="EditarProducto" component={EditarProductoScreen} />
              <Stack.Screen name="Configuracion" component={ConfiguracionesScreen}/>
            </Stack.Navigator>
          </NavigationContainer>
        </VentasProvider>
      </StockProvider>
    </ThemeProvider>
  );
}