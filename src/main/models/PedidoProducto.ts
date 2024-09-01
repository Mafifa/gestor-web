import db from '../db'

export interface PedidoProducto {
  id: number
  pedido_id: number
  producto_id: number
  cantidad: number
}

export class PedidoProductoModel {
  static createTable() {
    const stmt = `
      CREATE TABLE IF NOT EXISTS pedido_productos_navegante (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pedido_id INTEGER,
        producto_id INTEGER,
        cantidad INTEGER NOT NULL,
        FOREIGN KEY (pedido_id) REFERENCES pedidos_navegante(id),
        FOREIGN KEY (producto_id) REFERENCES productos_navegante(id)
      )
    `
    db.prepare(stmt).run()
  }

  static getAll(): PedidoProducto[] {
    const stmt = db.prepare('SELECT * FROM pedido_productos_navegante')
    return stmt.all()
  }

  static insert(pedidoProducto: Omit<PedidoProducto, 'id'>): void {
    const stmt = db.prepare(
      'INSERT INTO pedido_productos_navegante (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)'
    )
    stmt.run(pedidoProducto.pedido_id, pedidoProducto.producto_id, pedidoProducto.cantidad)
  }
}
