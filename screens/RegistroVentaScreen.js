import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { calcularTotalEstimado } from '../utils/calculos';
import { StockContext } from '../context/StockContext';
import { VentasContext } from '../context/VentasContext';
import { ThemeContext } from '../context/ThemeContext';

export default function RegistroVentaScreen({ navigation }) {
  const { productos, descontarStock } = useContext(StockContext);
  const { agregarVenta } = useContext(VentasContext);
  const { dark } = useContext(ThemeContext);
  const [cantidades, setCantidades] = useState({});
  const [valorIngresado, setValorIngresado] = useState('');

  useEffect(() => {
    if (productos && productos.length > 0) {
      setCantidades(productos.reduce((acc, prod) => ({ ...acc, [prod.id]: 0 }), {}));
    }
  }, [productos]);

  if (!productos) {
    return <Text>Cargando productos...</Text>;
  }

  const listaDeItems = productos
    .map(prod => ({
      ...prod,
      cantidad: cantidades[prod.id]
    }))
    .filter(item => item.cantidad > 0);

  const totalProductos = listaDeItems.reduce((acc, item) => acc + item.cantidad, 0);
  const totalEstimado = calcularTotalEstimado(listaDeItems);

  const handleCantidad = (id, delta) => {
    setCantidades(prev => {
      const nuevaCantidad = Math.max(0, prev[id] + delta);
      const prod = productos.find(p => p.id === id);
      return { ...prev, [id]: Math.min(nuevaCantidad, prod.stock) };
    });
  };

  const registrarVenta = () => {
    if (listaDeItems.length === 0) {
      Alert.alert('Error', 'Debes seleccionar al menos un producto.');
      return;
    }
    if (!valorIngresado || isNaN(valorIngresado)) {
      Alert.alert('Error', 'Ingresa un valor válido para la venta.');
      return;
    }
    const venta = {
      productos: listaDeItems.map(({ id, nombre, cantidad }) => ({ id, nombre, cantidad })),
      totalProductos,
      valorTotal: Number(valorIngresado),
      fecha: new Date().toISOString()
    };
    agregarVenta(venta);
    descontarStock(listaDeItems);
    Alert.alert('Venta registrada', 'La venta se registró correctamente.');
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: dark ? '#222' : '#fff' }]}>
      <Text style={[styles.title, { color: dark ? '#fff' : '#222' }]}>🧾 Registrar Venta</Text>
      <FlatList
        data={productos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.productoRow,
            { backgroundColor: dark ? '#333' : '#f1f1f1' }
          ]}>
            <Text style={[styles.nombre, { color: dark ? '#fff' : '#222' }]}>{item.nombre}</Text>
            <View style={styles.contador}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: dark ? '#444' : '#ddd' }]}
                onPress={() => handleCantidad(item.id, -1)}
              >
                <Text style={[styles.btnText, { color: dark ? '#fff' : '#222' }]}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.cantidad, { color: dark ? '#fff' : '#222' }]}>{cantidades[item.id]}</Text>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: dark ? '#444' : '#ddd' }]}
                onPress={() => handleCantidad(item.id, 1)}
              >
                <Text style={[styles.btnText, { color: dark ? '#fff' : '#222' }]}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.stock, { color: dark ? '#bbb' : '#888' }]}>Stock: {item.stock}</Text>
          </View>
        )}
      />

      <Text style={[styles.resumen, { color: dark ? '#fff' : '#222' }]}>Total productos: {totalProductos}</Text>
      <Text style={[styles.resumen, { color: dark ? '#fff' : '#222' }]}>Valor estimado: ${totalEstimado}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: dark ? '#333' : '#fff',
            color: dark ? '#fff' : '#222',
            borderColor: dark ? '#555' : '#ccc'
          }
        ]}
        placeholder="Valor real de la venta"
        placeholderTextColor={dark ? '#aaa' : '#888'}
        keyboardType="numeric"
        value={valorIngresado}
        onChangeText={setValorIngresado}
      />
      <View style={styles.botonContenedor}>
        <Button title="Registrar Venta" onPress={registrarVenta} color={dark ? '#90caf9' : undefined} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  productoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 8
  },
  nombre: { flex: 1, fontSize: 16 },
  contador: { flexDirection: 'row', alignItems: 'center' },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 4
  },
  btnText: { fontSize: 18, fontWeight: 'bold' },
  cantidad: { fontSize: 16, minWidth: 24, textAlign: 'center' },
  stock: { marginLeft: 8, fontSize: 12 },
  resumen: { fontSize: 16, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginVertical: 12,
    fontSize: 16
  },
  botonContenedor: {
    marginTop: 12,
    marginBottom: 70
  }
});