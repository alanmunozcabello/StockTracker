import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { VentasContext } from '../context/VentasContext';

export default function VentasScreen() {
  const { ventas, eliminarVenta } = useContext(VentasContext);

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
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Ventas</Text>
      <FlatList
        data={ventas}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => handleLongPress(item)}>
            <View style={styles.ventaItem}>
              <Text style={styles.fecha}>{new Date(item.fecha).toLocaleString()}</Text>
              <Text>Productos vendidos: {item.totalProductos}</Text>
              <Text>Valor total: ${item.valorTotal}</Text>
              <Text>Detalle:</Text>
              {item.productos.map(prod => (
                <Text key={prod.id} style={styles.detalle}>
                  - {prod.nombre}: {prod.cantidad}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No hay ventas registradas.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  ventaItem: { marginBottom: 16, padding: 12, backgroundColor: '#f1f1f1', borderRadius: 8 },
  fecha: { fontSize: 12, color: '#888', marginBottom: 4 },
  detalle: { fontSize: 14, marginLeft: 8 }
});