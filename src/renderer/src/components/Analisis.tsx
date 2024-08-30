// Analisis.tsx
import React from 'react'
import { BarChart } from 'lucide-react' // O el gráfico que prefieras

export default function Analisis() {
  return (
    <div className="flex-1 ml-16 flex flex-col overflow-hidden">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard de Análisis</h1>
        </div>
      </header>

      <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
          {/* Aquí podrías agregar gráficos, tablas, etc. */}
          <BarChart className="w-12 h-12 text-gray-500 mx-auto" />
          <p className="text-center text-gray-500 mt-4">Gráfico de ejemplo</p>
        </div>
      </main>
    </div>
  )
}
