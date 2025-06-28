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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StockProvider>
        <VentasProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Inicio" component={HomeScreen} />
                    <Stack.Screen name="RegistrarVenta" component={RegistroVentaScreen} />
                    <Stack.Screen name="Ventas" component={VentasScreen} />
                    <Stack.Screen name="AgregarProducto" component={AgregarProductoScreen} />
                    <Stack.Screen name="EditarProducto" component={EditarProductoScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </VentasProvider>
    </StockProvider>
  );
}