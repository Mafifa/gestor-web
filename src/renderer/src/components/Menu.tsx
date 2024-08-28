import { useOptionsStore, type Options } from '@renderer/store/MainStore'
import { Home, ShoppingCart, Users, BarChart2 } from 'lucide-react'

function Menu() {
  const { setOptions } = useOptionsStore()
  const options = [
    { icon: Home, label: 'Inicio' },
    { icon: ShoppingCart, label: 'Pedidos' },
    { icon: Users, label: 'Clientes' },
    { icon: BarChart2, label: 'Análisis' }
  ]

  const handleClick = async (label: Options) => {
    setOptions(label)
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-16 bg-gray-800 flex flex-col items-center py-4">
      {options.map((item, index) => (
        <div key={index} className="relative group mb-4">
          <button
            onClick={() => handleClick(item.label as Options)}
            className="p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            <item.icon className="h-6 w-6" />
            <span className="sr-only">{item.label}</span>
          </button>
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {item.label}
          </div>
        </div>
      ))}
    </aside>
  )
}

export default Menu
