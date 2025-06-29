import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StockContext } from '../context/StockContext';
import { ThemeContext } from '../context/ThemeContext';

export default function AgregarProductoScreen({ navigation }) {
  const { agregarProducto } = useContext(StockContext);
  const { dark } = useContext(ThemeContext);
  const [nombre, setNombre] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');

  const handleAgregar = () => {
    if (!nombre || !stock || !precio) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    const nuevoProducto = {
      id: 'p' + Date.now(),
      nombre,
      stock: Number(stock),
      precioCompraUnitario: Number(precio),
    };
    agregarProducto(nuevoProducto);
    Alert.alert('Éxito', 'Producto agregado');
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#222' : '#fff' }]}>
      <Text style={[styles.title, { color: dark ? '#fff' : '#222' }]}>Agregar Producto</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: dark ? '#333' : '#fff',
            color: dark ? '#fff' : '#222',
            borderColor: dark ? '#555' : '#ccc'
          }
        ]}
        placeholder="Nombre"
        placeholderTextColor={dark ? '#aaa' : '#888'}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: dark ? '#333' : '#fff',
            color: dark ? '#fff' : '#222',
            borderColor: dark ? '#555' : '#ccc'
          }
        ]}
        placeholder="Stock"
        placeholderTextColor={dark ? '#aaa' : '#888'}
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: dark ? '#333' : '#fff',
            color: dark ? '#fff' : '#222',
            borderColor: dark ? '#555' : '#ccc'
          }
        ]}
        placeholder="Precio compra unitario"
        placeholderTextColor={dark ? '#aaa' : '#888'}
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
      <Button title="Agregar" onPress={handleAgregar} color={dark ? '#90caf9' : undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    fontSize: 16
  }
});