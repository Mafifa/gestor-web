// Interfaz para la tabla de Secciones
export interface Seccion {
  id: number
  nombre: string
}

// Interfaz para la tabla de Productos
export interface Producto {
  id: number
  nombre: string
  precio: number
  seccion_id: number // Relación con Sección
}

// Interfaz para la tabla de Pedidos
export interface Pedido {
  id: number
  cliente_nombre: string
  telefono: string
  estado_pago: boolean
  codigo_referencia: string
  personalizacion: string
  longitud: number
  latitud: number
}

// Interfaz para la tabla intermedia de Productos en Pedidos
export interface PedidoProducto {
  id: number
  pedido_id: number // Relación con Pedido
  producto_id: number // Relación con Producto
  cantidad: number
}

// Interfaz para la tabla de Tasas
export interface Tasa {
  id: number
  tasa_dolar: number
  tasa_metro: number
}
