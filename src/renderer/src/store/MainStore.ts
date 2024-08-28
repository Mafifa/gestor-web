import { create } from 'zustand'

export type Options = 'Inicio' | 'Pedidos' | 'Clientes' | 'Análisis'

interface OptionsState {
  option: Options
  setOptions: (options: Options) => void
}

export const useOptionsStore = create<OptionsState>()((set) => ({
  option: 'Inicio',
  setOptions: (options) => set((state) => ({ option: (state.option = options) }))
}))
