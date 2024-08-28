import { useState } from 'react'
import { PlusCircle, Bell, Edit, Trash2, X } from 'lucide-react'

type Product = {
  id: number
  name: string
  price: number
}

type Section = {
  id: number
  title: string
  products: Product[]
}

const initialSections: Section[] = [
  {
    id: 1,
    title: 'Electrónicos',
    products: [
      { id: 1, name: 'Smartphone', price: 599.99 },
      { id: 2, name: 'Laptop', price: 999.99 },
      { id: 3, name: 'Tablet', price: 299.99 }
    ]
  },
  {
    id: 2,
    title: 'Ropa',
    products: [
      { id: 4, name: 'Camiseta', price: 19.99 },
      { id: 5, name: 'Pantalón', price: 49.99 },
      { id: 6, name: 'Zapatos', price: 79.99 }
    ]
  },
  {
    id: 3,
    title: 'Hogar',
    products: [
      { id: 7, name: 'Lámpara', price: 39.99 },
      { id: 8, name: 'Sofá', price: 599.99 },
      { id: 9, name: 'Mesa', price: 199.99 }
    ]
  }
]

export default function Start() {
  const [sections, setSections] = useState<Section[]>(initialSections)
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', price: 0 })

  const handleAddSection = () => {
    const newSection: Section = {
      id: Date.now(),
      title: 'Nueva Sección',
      products: []
    }
    setSections([...sections, newSection])
    setEditingSection(newSection)
  }

  const handleEditSection = (section: Section) => {
    setEditingSection({ ...section, products: [...section.products] })
  }

  const handleDeleteSection = (sectionId: number) => {
    setSections(sections.filter((section) => section.id !== sectionId))
  }

  const handleSaveSection = () => {
    if (editingSection) {
      setSections(
        sections.map((section) => (section.id === editingSection.id ? editingSection : section))
      )
      setEditingSection(null)
    }
  }

  const handleAddProduct = () => {
    if (editingSection && newProduct.name && newProduct.price > 0) {
      const updatedProducts = [...editingSection.products, { ...newProduct, id: Date.now() }]
      setEditingSection({ ...editingSection, products: updatedProducts })
      setNewProduct({ name: '', price: 0 })
    }
  }

  const handleDeleteProduct = (productId: number) => {
    if (editingSection) {
      const updatedProducts = editingSection.products.filter((product) => product.id !== productId)
      setEditingSection({ ...editingSection, products: updatedProducts })
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
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
                  <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
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
                    {section.products.map((product) => (
                      <li key={product.id} className="flex justify-between items-center">
                        <span className="text-gray-600">{product.name}</span>
                        <span className="font-semibold text-gray-800">
                          ${product.price.toFixed(2)}
                        </span>
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
              {editingSection.id === Date.now() ? 'Agregar' : 'Editar'} Sección
            </h2>
            <input
              type="text"
              value={editingSection.title}
              onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Título de la sección"
            />
            <h3 className="font-semibold mb-2">Productos</h3>
            <ul className="mb-4 space-y-2">
              {editingSection.products.map((product) => (
                <li key={product.id} className="flex justify-between items-center">
                  <span>
                    {product.name} - ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex mb-4">
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="flex-grow px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Nombre del producto"
              />
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
                }
                className="w-24 px-3 py-2 border-t border-b border-r focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Precio"
              />
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setEditingSection(null)}
                className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
