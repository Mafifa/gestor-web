import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import supabase from './utils/supabase'
import { ProductoModel } from './models/Producto'
import { SeccionModel } from './models/Seccion'
import db from './db'
import { TasaModel } from './models/Tasa'

function createWindow (): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this _ occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('seccion', async () => {
    const { data } = await supabase.from('secciones_navegante').select()

    return data
  })

  ipcMain.handle('productos', async () => {
    const { data } = await supabase.from('productos_navegante').select()

    return data
  })

  // IPC handler to get sections with products
  ipcMain.handle('get-sections-with-products', async () => {
    try {
      // Obtiene todas las secciones
      const secciones = SeccionModel.getAll()

      // Para cada sección, obtenemos los productos asociados
      const sections = secciones.map((seccion) => {
        const productos = ProductoModel.getBySeccionId(seccion.id)
        return {
          id: seccion.id,
          title: seccion.nombre,
          products: productos.map((producto) => ({
            id: producto.id,
            name: producto.nombre,
            price: producto.precio
          }))
        }
      })

      return sections
    } catch (error) {
      console.error('Error fetching sections with products:', error)
      throw error
    }
  })

  // Agregar una nueva sección
  ipcMain.handle('add-section', async (_, sectionName) => {
    const result = db
      .prepare(
        `
    INSERT INTO secciones_navegante (nombre) VALUES (?)
  `
      )
      .run(sectionName)

    return result.lastInsertRowid
  })

  // Editar una sección
  ipcMain.handle('edit-section', async (_, { id, title }) => {
    db.prepare(
      `
    UPDATE secciones_navegante SET nombre = ? WHERE id = ?
  `
    ).run(title, id)
  })

  // Eliminar una sección y sus productos asociados
  ipcMain.handle('delete-section', async (_, sectionId) => {
    // Eliminar productos asociados a la sección
    db.prepare(
      `
    DELETE FROM productos_navegante WHERE seccion_id = ?
  `
    ).run(sectionId)

    // Eliminar la sección
    db.prepare(
      `
    DELETE FROM secciones_navegante WHERE id = ?
  `
    ).run(sectionId)
  })

  // Agregar un nuevo producto
  ipcMain.handle('add-product', async (_, { name, price, sectionId }) => {
    const result = db
      .prepare(
        `
    INSERT INTO productos_navegante (nombre, precio, seccion_id) VALUES (?, ?, ?)
  `
      )
      .run(name, price, sectionId)

    return result.lastInsertRowid
  })

  // Eliminar un producto
  ipcMain.handle('delete-product', async (_, productId) => {
    db.prepare(
      `
    DELETE FROM productos_navegante WHERE id = ?
  `
    ).run(productId)
  })


  // Tomar una tasa
  ipcMain.handle('get-tasa', async () => {
    const result = TasaModel.getAll()
    return result[result.length - 1]

  })

  ipcMain.handle('add-tasa', async (_, arg: { tasa_dolar: number, tasa_metro: number }) => {
    return TasaModel.insert(arg.tasa_dolar, arg.tasa_metro)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
