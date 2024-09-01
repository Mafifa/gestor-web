import db from '../db'

export interface Producto {
  id: number
  nombre: string
  precio: number
  seccion_id: number
}

export class ProductoModel {
  static createTable() {
    const stmt = `
      CREATE TABLE IF NOT EXISTS productos_navegante (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        precio REAL NOT NULL,
        seccion_id INTEGER,
        FOREIGN KEY (seccion_id) REFERENCES secciones_navegante(id)
      )
    `
    db.prepare(stmt).run()
  }

  static getAll(): Producto[] {
    const stmt = db.prepare('SELECT * FROM productos_navegante')
    return stmt.all()
  }

  static getBySeccionId(seccion_id: number): Producto[] {
    const stmt = db.prepare('SELECT * FROM productos_navegante WHERE seccion_id = ?')
    return stmt.all(seccion_id)
  }

  static insert(nombre: string, precio: number, seccion_id: number): void {
    const stmt = db.prepare(
      'INSERT INTO productos_navegante (nombre, precio, seccion_id) VALUES (?, ?, ?)'
    )
    stmt.run(nombre, precio, seccion_id)
  }
}
