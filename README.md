# StockTracker

App móvil para llevar el registro de productos, ventas y stock, desarrollada en React Native.

## Características

- Registro y visualización de productos con stock y precio.
- Registro de ventas con selección de productos y cantidades.
- Descuento automático de stock al vender.
- Historial de ventas persistente (se guarda aunque cierres la app).
- Edición y eliminación de productos (mantén presionado un producto).
- Eliminación de ventas (mantén presionada una venta).
- Menú para añadir productos y futuras configuraciones.
- Persistencia de datos usando AsyncStorage.

## Instalación

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/tuusuario/StockTracker.git
   cd StockTracker
   ```

2. **Instala dependencias:**
   ```sh
   npm install
   ```

3. **Instala dependencias nativas (si usas Expo, ya está listo):**
   ```sh
   npx expo install @react-native-async-storage/async-storage
   ```

4. **Inicia la app:**
   ```sh
   npx expo start
   ```
   Escanea el QR con Expo Go en tu celular.

## Uso

- **Añadir producto:** Menú ⋮ arriba a la derecha → "Añadir producto".
- **Editar/eliminar producto:** Mantén presionado un producto en la lista.
- **Registrar venta:** Botón "Registrar Venta".
- **Ver historial de ventas:** Botón "Historial de Ventas".
- **Eliminar venta:** Mantén presionada una venta en el historial.

## Estructura principal

- `/screens`: Pantallas principales (Home, RegistroVenta, Ventas, Agregar/Editar Producto)
- `/context`: Contextos para productos y ventas (manejo de estado global y persistencia)
- `/data`: Datos iniciales de productos y ventas
- `/utils`: Funciones de cálculo

## Requisitos

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Expo Go en tu celular (opcional, para pruebas rápidas)

## Licencia

MIT

---

> ¡Hecho con ❤️ para llevar el control de tus ventas y productos!
