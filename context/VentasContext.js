import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const VentasContext = createContext();

export function VentasProvider({ children }) {
  const [ventas, setVentas] = useState([]);

  // Cargar ventas al iniciar
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('VENTAS');
      if (data) setVentas(JSON.parse(data));
    })();
  }, []);

  // Guardar ventas cada vez que cambian
  useEffect(() => {
    AsyncStorage.setItem('VENTAS', JSON.stringify(ventas));
  }, [ventas]);

  const agregarVenta = (venta) => {
    setVentas(prev => [venta, ...prev]);
  };

  const eliminarVenta = (fecha) => {
    setVentas(prev => prev.filter(v => v.fecha !== fecha));
  };

  return (
    <VentasContext.Provider value={{ ventas, agregarVenta, eliminarVenta }}>
      {children}
    </VentasContext.Provider>
  );
}