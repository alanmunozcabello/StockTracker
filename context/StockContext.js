import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productosIniciales from '../data/productos';

export const StockContext = createContext();

export function StockProvider({ children }) {
  const [productos, setProductos] = useState(productosIniciales);

  // Cargar productos al iniciar
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem('PRODUCTOS');
      if (data) setProductos(JSON.parse(data));
    })();
  }, []);

  // Guardar productos cada vez que cambian
  useEffect(() => {
    AsyncStorage.setItem('PRODUCTOS', JSON.stringify(productos));
  }, [productos]);

  const descontarStock = (ventas) => {
    setProductos(prev =>
      prev.map(prod => {
        const vendido = ventas.find(v => v.id === prod.id);
        if (vendido) {
          return { ...prod, stock: prod.stock - vendido.cantidad };
        }
        return prod;
      })
    );
  };

  const agregarProducto = (nuevoProducto) => {
    setProductos(prev => [...prev, nuevoProducto]);
  };

  const editarProducto = (productoEditado) => {
    setProductos(prev =>
      prev.map(prod => prod.id === productoEditado.id ? productoEditado : prod)
    );
  };

  const eliminarProducto = (productoId) => {
    setProductos(prev => prev.filter(prod => prod.id !== productoId));
  };

  return (
    <StockContext.Provider value={{ productos, descontarStock, agregarProducto, editarProducto, eliminarProducto }}>
      {children}
    </StockContext.Provider>
  );
}