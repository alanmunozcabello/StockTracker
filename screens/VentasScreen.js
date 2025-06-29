import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { VentasContext } from '../context/VentasContext';
import { ThemeContext } from '../context/ThemeContext';

export default function VentasScreen() {
  const { ventas, eliminarVenta } = useContext(VentasContext);
  const { dark } = useContext(ThemeContext);

  const handleLongPress = (venta) => {
    Alert.alert(
      'Eliminar venta',
      '¿Seguro que quieres eliminar esta venta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarVenta(venta.fecha)
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#222' : '#fff' }]}>
      <Text style={[styles.title, { color: dark ? '#fff' : '#222' }]}>Registro de Ventas</Text>
      <FlatList
        data={ventas}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item)}>
            <View style={[
              styles.ventaItem,
              { backgroundColor: dark ? '#333' : '#f1f1f1' }
            ]}>
              <Text style={[styles.fecha, { color: dark ? '#bbb' : '#888' }]}>{new Date(item.fecha).toLocaleString()}</Text>
              <Text style={{ color: dark ? '#fff' : '#222' }}>Productos vendidos: {item.totalProductos}</Text>
              <Text style={{ color: dark ? '#fff' : '#222' }}>Valor total: ${item.valorTotal}</Text>
              <Text style={{ color: dark ? '#fff' : '#222' }}>Detalle:</Text>
              {item.productos.map(prod => (
                <Text key={prod.id} style={[styles.detalle, { color: dark ? '#fff' : '#222' }]}>
                  - {prod.nombre}: {prod.cantidad}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ color: dark ? '#fff' : '#222' }}>No hay ventas registradas.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  ventaItem: { marginBottom: 16, padding: 12, borderRadius: 8 },
  fecha: { fontSize: 12, marginBottom: 4 },
  detalle: { fontSize: 14, marginLeft: 8 }
});