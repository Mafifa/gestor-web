import { useEffect, useState } from 'react'
import { PlusCircle, Bell, Edit, Trash2, X } from 'lucide-react'
import { Seccion, Producto } from '../../../types/types'

export default function Start() {
  const [sections, setSections] = useState<Seccion[]>([])
  const [products, setProducts] = useState<Producto[]>([])
  const [editingSection, setEditingSection] = useState<Seccion | null>(null)
  const [newProduct, setNewProduct] = useState<Omit<Producto, 'id'>>({
    nombre: '',
    precio: 0,
    seccion_id: 0
  })

  async function fetchSections() {
    const result = await window.electron.ipcRenderer.invoke('seccion')
    setSections(result)
  }

  async function fetchProducts() {
    const result = await window.electron.ipcRenderer.invoke('productos')
    setProducts(result)
  }

  useEffect(() => {
    fetchSections()
    fetchProducts()
  }, [])

  const handleAddSection = async () => {
    const newSection = { nombre: 'Nueva Sección' } // Nombre predeterminado para la nueva sección
    try {
      const createdSection = await window.electron.ipcRenderer.invoke('agregar-seccion', newSection)
      if (createdSection && createdSection.id) {
        setSections([...sections, createdSection])
      } else {
        console.error('Error al agregar la sección, no se recibió un ID.')
      }
    } catch (error) {
      console.error('Error al agregar la sección:', error)
    }
  }

  const handleEditSection = (section: Seccion) => {
    setEditingSection(section)
  }

  const handleDeleteSection = async (sectionId: number) => {
    await window.electron.ipcRenderer.invoke('eliminar-seccion', sectionId)
    setSections(sections.filter((section) => section.id !== sectionId))
  }

  const handleSaveSection = async () => {
    if (editingSection) {
      const updatedSection = await window.electron.ipcRenderer.invoke(
        'editar-seccion',
        editingSection
      )
      setSections(
        sections.map((section) => (section.id === updatedSection.id ? updatedSection : section))
      )
      setEditingSection(null)
    }
  }

  const handleAddProduct = async () => {
    if (editingSection && newProduct.nombre && newProduct.precio > 0) {
      const productToAdd = {
        ...newProduct,
        seccion_id: editingSection.id
      }
      const addedProduct = await window.electron.ipcRenderer.invoke(
        'agregar-producto',
        productToAdd
      )
      setProducts([...products, addedProduct])
      setNewProduct({ nombre: '', precio: 0, seccion_id: editingSection.id })
    }
  }

  const handleDeleteProduct = async (productId: number) => {
    await window.electron.ipcRenderer.invoke('eliminar-producto', productId)
    setProducts(products.filter((product) => product.id !== productId))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 ml-16 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard de Productos</h1>
            <div className="relative">
              <input
                type="search"
                placeholder="Buscar..."
                className="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-lg shadow-md border border-gray-200"
              >
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">{section.nombre}</h2>
                  <div>
                    <button
                      onClick={() => handleEditSection(section)}
                      className="p-1 text-gray-500 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md"
                    >
                      <Edit className="h-5 w-5" />
                      <span className="sr-only">Editar sección</span>
                    </button>
                    <button
                      onClick={() => handleDeleteSection(section.id)}
                      className="p-1 text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-md ml-2"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="sr-only">Eliminar sección</span>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {products
                      .filter((product) => product.seccion_id === section.id)
                      .map((product) => (
                        <li key={product.id} className="flex justify-between items-center">
                          <span className="text-gray-600">{product.nombre}</span>
                          <span className="font-semibold text-gray-800">
                            ${product.precio.toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                            <span className="sr-only">Eliminar producto</span>
                          </button>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 flex flex-col justify-center items-center p-6">
              <button
                onClick={handleAddSection}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar nueva sección
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Notification bubble */}
      <div className="fixed bottom-4 right-4 z-50">
        <button className="relative p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notificaciones</span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>
      </div>

      {/* Edit Section Modal */}
      {editingSection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingSection.id ? 'Editar' : 'Agregar'} Sección
            </h2>
            <input
              type="text"
              value={editingSection.nombre}
              onChange={(e) => setEditingSection({ ...editingSection, nombre: e.target.value })}
              className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Título de la sección"
            />
            <h3 className="font-semibold mb-2">Productos</h3>
            <ul className="mb-4 space-y-2">
              {products
                .filter((product) => product.seccion_id === editingSection.id)
                .map((product) => (
                  <li key={product.id} className="flex justify-between items-center">
                    <span>
                      {product.nombre} - ${product.precio.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Eliminar producto</span>
                    </button>
                  </li>
                ))}
            </ul>
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={newProduct.nombre}
                onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
                className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Nombre del producto"
              />
              <input
                type="number"
                value={newProduct.precio}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, precio: parseFloat(e.target.value) })
                }
                className="w-24 px-3 py-2 border-t border-b focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Precio"
              />
              <button
                onClick={handleAddProduct}
                className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveSection}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
