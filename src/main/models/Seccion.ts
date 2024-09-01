import db from '../db'

export interface Seccion {
  id: number
  nombre: string
}

export class SeccionModel {
  static createTable() {
    const stmt = `
      CREATE TABLE IF NOT EXISTS secciones_navegante (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL
      )
    `
    db.prepare(stmt).run()
  }

  static getAll(): Seccion[] {
    const stmt = db.prepare('SELECT * FROM secciones_navegante')
    return stmt.all()
  }

  static insert(nombre: string): void {
    const stmt = db.prepare('INSERT INTO secciones_navegante (nombre) VALUES (?)')
    stmt.run(nombre)
  }
}
