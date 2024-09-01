import db from '../db'

export interface Tasa {
  id: number
  tasa_dolar: number
  tasa_metro: number
}

export class TasaModel {
  static createTable() {
    const stmt = `
      CREATE TABLE IF NOT EXISTS tasas_navegante (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tasa_dolar REAL NOT NULL,
        tasa_metro REAL NOT NULL
      )
    `
    db.prepare(stmt).run()
  }

  static getAll(): Tasa[] {
    const stmt = db.prepare('SELECT * FROM tasas_navegante')
    return stmt.all()
  }

  static insert(tasa_dolar: number, tasa_metro: number): void {
    const stmt = db.prepare('INSERT INTO tasas_navegante (tasa_dolar, tasa_metro) VALUES (?, ?)')
    stmt.run(tasa_dolar, tasa_metro)
  }
}
