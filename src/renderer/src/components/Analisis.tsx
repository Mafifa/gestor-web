import { useState, useEffect } from 'react'
import {
  Home,
  ShoppingBag,
  Users,
  BarChart2,
  Bell,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart
} from 'lucide-react'

// Nota: En un escenario real, estas librerías deberían ser instaladas y importadas correctamente
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'

type AnalyticsData = {
  dailySales: { date: string; sales: number }[]
  productPerformance: { name: string; sales: number; stock: number }[]
  customerSegmentation: { name: string; value: number }[]
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

const mockAnalyticsData: AnalyticsData = {
  dailySales: [
    { date: '2023-06-01', sales: 4000 },
    { date: '2023-06-02', sales: 3000 },
    { date: '2023-06-03', sales: 5000 },
    { date: '2023-06-04', sales: 2780 },
    { date: '2023-06-05', sales: 1890 },
    { date: '2023-06-06', sales: 2390 },
    { date: '2023-06-07', sales: 3490 }
  ],
  productPerformance: [
    { name: 'Producto A', sales: 4000, stock: 2400 },
    { name: 'Producto B', sales: 3000, stock: 1398 },
    { name: 'Producto C', sales: 2000, stock: 9800 },
    { name: 'Producto D', sales: 2780, stock: 3908 },
    { name: 'Producto E', sales: 1890, stock: 4800 }
  ],
  customerSegmentation: [
    { name: 'Nuevos', value: 400 },
    { name: 'Recurrentes', value: 300 },
    { name: 'Inactivos', value: 300 },
    { name: 'VIP', value: 200 }
  ],
  totalRevenue: 54680,
  totalOrders: 267,
  averageOrderValue: 204.79
}

export default function Analisis() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    // Simular una llamada a la API
    setTimeout(() => {
      setAnalyticsData(mockAnalyticsData)
    }, 1000)
  }, [])

  if (!analyticsData) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 ml-16 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard de Análisis</h1>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-500 bg-opacity-75">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="mb-2 text-sm font-medium text-gray-600">Ingresos Totales</p>
                  <p className="text-lg font-semibold text-gray-700">
                    ${analyticsData.totalRevenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-500 bg-opacity-75">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="mb-2 text-sm font-medium text-gray-600">Pedidos Totales</p>
                  <p className="text-lg font-semibold text-gray-700">{analyticsData.totalOrders}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-500 bg-opacity-75">
                  <Package className="h-8 w-8 text-white" />
                </div>
                <div className="ml-4">
                  <p className="mb-2 text-sm font-medium text-gray-600">Valor Promedio de Pedido</p>
                  <p className="text-lg font-semibold text-gray-700">
                    ${analyticsData.averageOrderValue.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Ventas Diarias</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.dailySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Rendimiento de Productos</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.productPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                  <Bar dataKey="stock" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-8 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Segmentación de Clientes</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.customerSegmentation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {analyticsData.customerSegmentation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
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
    </div>
  )
}
