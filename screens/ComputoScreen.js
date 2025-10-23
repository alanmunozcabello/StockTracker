import { useContext, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { VentasContext } from '../context/VentasContext';
import { calcularCostoTotal } from '../utils/calculos';

export default function ComputoScreen() {
  const { ventas } = useContext(VentasContext);
  const { dark } = useContext(ThemeContext);

  // Filtrar ventas del día de hoy
  const ventasHoy = useMemo(() => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    return ventas.filter(venta => {
      const fechaVenta = new Date(venta.fecha);
      fechaVenta.setHours(0, 0, 0, 0);
      return fechaVenta.getTime() === hoy.getTime();
    });
  }, [ventas]);

  // Calcular estadísticas del día
  const estadisticas = useMemo(() => {
    const totalVentas = ventasHoy.length;
    const dineroTotal = ventasHoy.reduce((sum, venta) => sum + venta.valorTotal, 0);
    
    // Calcular costo total (suma de todos los costos de productos vendidos)
    const costoTotal = ventasHoy.reduce((sum, venta) => {
      return sum + calcularCostoTotal(venta.productos);
    }, 0);
    
    const profit = dineroTotal - costoTotal;
    
    // Agregar productos por nombre
    const productosVendidos = {};
    ventasHoy.forEach(venta => {
      venta.productos.forEach(prod => {
        if (productosVendidos[prod.nombre]) {
          productosVendidos[prod.nombre] += prod.cantidad;
        } else {
          productosVendidos[prod.nombre] = prod.cantidad;
        }
      });
    });
    
    // Convertir a array para el FlatList
    const listaProductos = Object.entries(productosVendidos).map(([nombre, cantidad]) => ({
      nombre,
      cantidad
    }));
    
    return {
      totalVentas,
      dineroTotal,
      costoTotal,
      profit,
      listaProductos
    };
  }, [ventasHoy]);

  const containerBg = dark ? '#222' : '#fff';
  const textColor = dark ? '#fff' : '#222';
  const cardBg = dark ? '#333' : '#f5f5f5';
  const accentColor = dark ? '#4a90e2' : '#007AFF';
  const positiveColor = '#4CAF50';
  const negativeColor = '#F44336';

  return (
    <ScrollView style={[styles.container, { backgroundColor: containerBg }]}>
      <Text style={[styles.title, { color: textColor }]}>📊 Cómputo del Día</Text>
      
      {/* Tarjetas de resumen */}
      <View style={styles.statsContainer}>
        {/* Total de ventas */}
        <View style={[styles.statCard, { backgroundColor: cardBg }]}>
          <Text style={[styles.statLabel, { color: textColor }]}>Total de Ventas</Text>
          <Text style={[styles.statValue, { color: accentColor }]}>
            {estadisticas.totalVentas}
          </Text>
        </View>

        {/* Dinero vendido */}
        <View style={[styles.statCard, { backgroundColor: cardBg }]}>
          <Text style={[styles.statLabel, { color: textColor }]}>Dinero Vendido</Text>
          <Text style={[styles.statValue, { color: accentColor }]}>
            ${estadisticas.dineroTotal.toLocaleString()}
          </Text>
        </View>

        {/* Costo total */}
        <View style={[styles.statCard, { backgroundColor: cardBg }]}>
          <Text style={[styles.statLabel, { color: textColor }]}>Costo Total</Text>
          <Text style={[styles.statValue, { color: negativeColor }]}>
            ${estadisticas.costoTotal.toLocaleString()}
          </Text>
        </View>

        {/* Profit */}
        <View style={[styles.statCard, { backgroundColor: cardBg }]}>
          <Text style={[styles.statLabel, { color: textColor }]}>Profit (Ganancia)</Text>
          <Text style={[styles.statValue, { color: estadisticas.profit >= 0 ? positiveColor : negativeColor }]}>
            ${estadisticas.profit.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Listado de productos vendidos */}
      <View style={styles.productosSection}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Productos Vendidos Hoy
        </Text>
        
        {estadisticas.listaProductos.length > 0 ? (
          <View>
            {estadisticas.listaProductos.map((item, index) => (
              <View 
                key={index} 
                style={[styles.productoItem, { backgroundColor: cardBg }]}
              >
                <Text style={[styles.productoNombre, { color: textColor }]}>
                  {item.nombre}
                </Text>
                <Text style={[styles.productoCantidad, { color: accentColor }]}>
                  {item.cantidad} unidades
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={[styles.emptyText, { color: textColor }]}>
            No hay productos vendidos hoy
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.7,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productosSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productoNombre: {
    fontSize: 16,
    fontWeight: '500',
  },
  productoCantidad: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    opacity: 0.6,
  },
});