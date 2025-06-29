import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('MODO_OSCURO');
      if (saved === null) {
        // Si no hay preferencia, usa el sistema
        setDark(Appearance.getColorScheme() === 'dark');
      } else {
        setDark(saved === 'true');
      }
    })();
    // Escucha cambios del sistema solo si no hay preferencia guardada
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      AsyncStorage.getItem('MODO_OSCURO').then(saved => {
        if (saved === null) setDark(colorScheme === 'dark');
      });
    });
    return () => listener.remove();
  }, []);

  const toggleDark = async () => {
    await AsyncStorage.setItem('MODO_OSCURO', (!dark).toString());
    setDark(!dark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}