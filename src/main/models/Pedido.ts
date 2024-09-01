import db from '../db'

export interface Pedido {
  id: number
  cliente_nombre: string
  telefono: string
  fecha: string
  estado_pago: boolean
  codigo_referencia?: string
  personalizacion?: string
  longitud?: number
  latitud?: number
}

export class PedidoModel {
  static createTable() {
    const stmt = `
      CREATE TABLE IF NOT EXISTS pedidos_navegante (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_nombre TEXT NOT NULL,
        telefono TEXT NOT NULL,
        fecha TEXT DEFAULT CURRENT_TIMESTAMP,
        estado_pago INTEGER DEFAULT 0,
        codigo_referencia TEXT,
        personalizacion TEXT,
        longitud REAL,
        latitud REAL
      )
    `
    db.prepare(stmt).run()
  }

  static getAll(): Pedido[] {
    const stmt = db.prepare('SELECT * FROM pedidos_navegante')
    return stmt.all()
  }

  static insert(pedido: Omit<Pedido, 'id'>): void {
    const stmt = db.prepare(`
      INSERT INTO pedidos_navegante 
      (cliente_nombre, telefono, fecha, estado_pago, codigo_referencia, personalizacion, longitud, latitud) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    stmt.run(
      pedido.cliente_nombre,
      pedido.telefono,
      pedido.fecha,
      pedido.estado_pago ? 1 : 0,
      pedido.codigo_referencia,
      pedido.personalizacion,
      pedido.longitud,
      pedido.latitud
    )
  }
}
