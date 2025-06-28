import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { StockContext } from '../context/StockContext';

export default function EditarProductoScreen({ route, navigation }) {
  const { productos, editarProducto } = useContext(StockContext);
  const { productoId } = route.params;
  const producto = productos.find(p => p.id === productoId);

  const [nombre, setNombre] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setStock(producto.stock.toString());
      setPrecio(producto.precioCompraUnitario.toString());
    }
  }, [producto]);

  const handleEditar = () => {
    if (!nombre || !stock || !precio) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    editarProducto({
      ...producto,
      nombre,
      stock: Number(stock),
      precioCompraUnitario: Number(precio),
    });
    Alert.alert('Éxito', 'Producto editado');
    navigation.goBack();
  };

  if (!producto) {
    return <Text>Producto no encontrado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Producto</Text>
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
      <Button title="Guardar Cambios" onPress={handleEditar} />
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