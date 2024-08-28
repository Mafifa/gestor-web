import { useState } from 'react'
import { Home, ShoppingBag, Users, BarChart2, Bell, Check, X, Eye, EyeOff } from 'lucide-react'

type OrderItem = {
  id: number
  name: string
  quantity: number
  price: number
}

type Order = {
  id: number
  customerName: string
  customerPhone: string
  date: string
  items: OrderItem[]
  total: number
  isPaid: boolean
  paymentReference: string
}

const initialOrders: Order[] = [
  {
    id: 1,
    customerName: 'Juan Pérez',
    customerPhone: '+34 123 456 789',
    date: '2023-06-01',
    items: [
      { id: 1, name: 'Smartphone', quantity: 1, price: 599.99 },
      { id: 2, name: 'Funda protectora', quantity: 1, price: 29.99 }
    ],
    total: 629.98,
    isPaid: true,
    paymentReference: 'REF123456'
  },
  {
    id: 2,
    customerName: 'María García',
    customerPhone: '+34 987 654 321',
    date: '2023-06-02',
    items: [
      { id: 3, name: 'Laptop', quantity: 1, price: 999.99 },
      { id: 4, name: 'Mouse inalámbrico', quantity: 1, price: 39.99 }
    ],
    total: 1039.98,
    isPaid: false,
    paymentReference: 'REF789012'
  },
  {
    id: 3,
    customerName: 'Carlos Rodríguez',
    customerPhone: '+34 456 789 123',
    date: '2023-06-03',
    items: [
      { id: 5, name: 'Tablet', quantity: 1, price: 299.99 },
      { id: 6, name: 'Teclado Bluetooth', quantity: 1, price: 59.99 }
    ],
    total: 359.98,
    isPaid: true,
    paymentReference: 'REF345678'
  }
]

export default function Pedidos() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [showPaymentReference, setShowPaymentReference] = useState<boolean>(false)

  const handleTogglePaid = (orderId: number) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, isPaid: !order.isPaid } : order))
    )
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
  }

  const togglePaymentReferenceVisibility = () => {
    setShowPaymentReference(!showPaymentReference)
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 ml-16 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard de Pedidos</h1>
            <div className="relative">
              <input
                type="search"
                placeholder="Buscar pedidos..."
                className="w-64 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cliente
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Teléfono
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Referencia de Pago
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.customerPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.isPaid ? 'Pagado' : 'Pendiente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {showPaymentReference ? order.paymentReference : '••••••'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleTogglePaid(order.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        Marcar como {order.isPaid ? 'No Pagado' : 'Pagado'}
                      </button>
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={togglePaymentReferenceVisibility}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              {showPaymentReference ? (
                <>
                  <EyeOff className="h-5 w-5 mr-2" />
                  Ocultar Referencias de Pago
                </>
              ) : (
                <>
                  <Eye className="h-5 w-5 mr-2" />
                  Mostrar Referencias de Pago
                </>
              )}
            </button>
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Detalles del Pedido #{selectedOrder.id}</h2>
            <p>
              <strong>Cliente:</strong> {selectedOrder.customerName}
            </p>
            <p>
              <strong>Teléfono:</strong> {selectedOrder.customerPhone}
            </p>
            <p>
              <strong>Fecha:</strong> {selectedOrder.date}
            </p>
            <p>
              <strong>Estado:</strong> {selectedOrder.isPaid ? 'Pagado' : 'Pendiente'}
            </p>
            <p>
              <strong>Referencia de Pago:</strong> {selectedOrder.paymentReference}
            </p>
            <h3 className="font-semibold mt-4 mb-2">Artículos:</h3>
            <ul className="mb-4">
              {selectedOrder.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="font-semibold">Total: ${selectedOrder.total.toFixed(2)}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
