import Database from 'better-sqlite3'
import path from 'path'

// Inicializa la base de datos
// Navega hacia la carpeta dbTemporal que está al mismo nivel de la carpeta del proyecto
const dbPath = path.resolve(__dirname, '..', '..', '..', 'dbTemporal', 'navegante')

// Inicializa la conexión a la base de datos
const db = new Database(dbPath, { verbose: console.log })

export default db
