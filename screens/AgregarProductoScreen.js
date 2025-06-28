import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StockContext } from '../context/StockContext';

export default function AgregarProductoScreen({ navigation }) {
  const { agregarProducto } = useContext(StockContext);
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
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Precio compra unitario"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
      <Button title="Agregar" onPress={handleAgregar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
    fontSize: 16
  }
});