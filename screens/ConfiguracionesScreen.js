import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Switch, Button, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { StockContext } from '../context/StockContext';
import { VentasContext } from '../context/VentasContext';
import { ThemeContext } from '../context/ThemeContext';

export default function ConfiguracionesScreen() {
  const [notificaciones, setNotificaciones] = useState(false);
  const [nombre, setNombre] = useState('');
  const [nombreGuardado, setNombreGuardado] = useState('');
  const { productos, setProductos } = useContext(StockContext);
  const { ventas, setVentas } = useContext(VentasContext);
  const { dark, toggleDark } = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      const notif = await AsyncStorage.getItem('NOTIFICACIONES');
      setNotificaciones(notif === 'true');
      const nombreGuardado = await AsyncStorage.getItem('NOMBRE_USUARIO');
      if (nombreGuardado) {
        setNombre(nombreGuardado);
        setNombreGuardado(nombreGuardado);
      }
    })();
  }, []);

  const toggleNotificaciones = async () => {
    await AsyncStorage.setItem('NOTIFICACIONES', (!notificaciones).toString());
    setNotificaciones(!notificaciones);
  };

  const guardarNombre = async () => {
    await AsyncStorage.setItem('NOMBRE_USUARIO', nombre);
    setNombreGuardado(nombre);
    Alert.alert('Guardado', 'Nombre actualizado');
  };

  const resetearDatos = async () => {
    Alert.alert(
      'Restablecer datos',
      '¿Seguro que quieres borrar todos los productos y ventas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar todo',
          style: 'destructive',
          onPress: async () => {
            setProductos([]);
            setVentas([]);
            await AsyncStorage.removeItem('PRODUCTOS');
            await AsyncStorage.removeItem('VENTAS');
            Alert.alert('Listo', 'Datos borrados');
          }
        }
      ]
    );
  };

  const exportarDatos = async () => {
    try {
      const data = {
        productos,
        ventas,
      };
      const fileUri = FileSystem.documentDirectory + 'stocktracker_backup.json';
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data, null, 2));
      Alert.alert('Exportado', `Archivo guardado en:\n${fileUri}`);
    } catch (e) {
      Alert.alert('Error', 'No se pudo exportar');
    }
  };

  const importarDatos = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
      if (res.type === 'success') {
        const contenido = await FileSystem.readAsStringAsync(res.uri);
        const data = JSON.parse(contenido);
        if (data.productos && data.ventas) {
          setProductos(data.productos);
          setVentas(data.ventas);
          await AsyncStorage.setItem('PRODUCTOS', JSON.stringify(data.productos));
          await AsyncStorage.setItem('VENTAS', JSON.stringify(data.ventas));
          Alert.alert('Importado', 'Datos restaurados');
        } else {
          Alert.alert('Error', 'El archivo no es válido');
        }
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo importar');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#222' : '#fff' }]}>
      <Text style={[styles.title, { color: dark ? '#fff' : '#222' }]}>Configuraciones</Text>

      {/* Modo oscuro */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: dark ? '#fff' : '#222' }]}>Modo oscuro</Text>
        <Switch value={dark} onValueChange={toggleDark} />
      </View>

      {/* Notificaciones bajo stock */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: dark ? '#fff' : '#222' }]}>Notificaciones bajo stock</Text>
        <Switch value={notificaciones} onValueChange={toggleNotificaciones} />
      </View>

      {/* Nombre de usuario/negocio */}
      <View style={styles.row}>
        <Text style={[styles.label, { color: dark ? '#fff' : '#222' }]}>Nombre de negocio</Text>
      </View>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: dark ? '#333' : '#fff',
            color: dark ? '#fff' : '#222',
            borderColor: dark ? '#555' : '#ccc'
          }
        ]}
        placeholder="Nombre de tu negocio"
        placeholderTextColor={dark ? '#aaa' : '#888'}
        value={nombre}
        onChangeText={setNombre}
        onBlur={guardarNombre}
      />
      <Button title="Guardar nombre" onPress={guardarNombre} color={dark ? '#90caf9' : undefined} />

      {/* Exportar/Importar */}
      <View style={styles.row}>
        <Button title="Exportar datos" onPress={exportarDatos} color={dark ? '#90caf9' : undefined} />
        <Button title="Importar datos" onPress={importarDatos} color={dark ? '#90caf9' : undefined} />
      </View>

      {/* Restablecer datos */}
      <View style={styles.row}>
        <Button title="Restablecer datos" color="red" onPress={resetearDatos} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 10 },
  label: { fontSize: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    fontSize: 16
  }
});