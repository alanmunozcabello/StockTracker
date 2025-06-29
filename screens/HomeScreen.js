import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  SafeAreaView,
  Platform,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { StockContext } from '../context/StockContext';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { productos, eliminarProducto } = useContext(StockContext);

  const { dark } = React.useContext(ThemeContext);

  const backgroundColor = dark ? '#222' : '#fff';
  const textColor = dark ? '#fff' : '#222';

  const [menuVisible, setMenuVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Modal para opciones de producto
  const [opcionesVisible, setOpcionesVisible] = useState(false);

  const handleLongPress = (producto) => {
    setProductoSeleccionado(producto);
    setOpcionesVisible(true);
  };

  const handleEliminar = () => {
    Alert.alert(
      'Eliminar producto',
      `¿Seguro que quieres eliminar "${productoSeleccionado.nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            eliminarProducto(productoSeleccionado.id);
            setOpcionesVisible(false);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }]}>
      <View style={[styles.container, { backgroundColor }]}>
        {/* Encabezado con botón de menú */}
        <View style={styles.headerRow}>
          <Text style={[styles.titulo, { color: textColor }]}>📦 Lista de Productos</Text>
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
            <Text style={styles.menuIcon}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Menú Modal (solo para añadir producto y configuraciones) */}
        <Modal
          visible={menuVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.menuContainer}>
                  <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('AgregarProducto'); }}>
                    <Text style={styles.menuText}>Añadir producto</Text>
                  </TouchableOpacity>
                  <View style={styles.menuDivider} />
                  <TouchableOpacity style={styles.menuItem} onPress={() => { setMenuVisible(false); navigation.navigate('Configuracion'); }}>
                    <Text style={styles.menuText}>Configuraciones</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Modal de opciones al mantener presionado un producto */}
        <Modal
          visible={opcionesVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setOpcionesVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setOpcionesVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.menuContainer}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                      setOpcionesVisible(false);
                      navigation.navigate('EditarProducto', { productoId: productoSeleccionado.id });
                    }}
                  >
                    <Text style={styles.menuText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handleEliminar}
                  >
                    <Text style={[styles.menuText, { color: 'red' }]}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <FlatList
          data={productos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => handleLongPress(item)}
              delayLongPress={300}
              activeOpacity={0.7}
            >
              <View style={[
                styles.item,
                { backgroundColor: dark ? '#333' : '#f1f1f1' }
              ]}>
                <Text style={[styles.nombre, { color: textColor }]}>{item.nombre}</Text>
                <Text style={{ color: textColor }}>Stock: {item.stock}</Text>
                <Text style={{ color: textColor }}>Compra: ${item.precioCompraUnitario}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        <View style={styles.botonContenedor}>
          <Button
            title="Historial de Ventas"
            onPress={() => navigation.navigate('Ventas')}
          />
        </View>
        <View style={[styles.botonContenedor, styles.extra, { marginBottom: 70 }]}>
          <Button
            title="Registrar Venta" color="green"
            onPress={() => navigation.navigate('RegistrarVenta')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 12
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  menuButton: {
    padding: 8
  },
  menuIcon: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 50,
    marginRight: 16,
    paddingVertical: 8,
    width: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  menuText: {
    fontSize: 16
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4
  },
  item: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  botonContenedor: {
    marginTop: 12,
    marginBottom: 5
  }
});