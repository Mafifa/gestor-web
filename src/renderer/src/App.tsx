// import Dashboard from './components/prueba'
import Menu from './components/Menu'
import Start from './components/Start'
import Pedidos from './components/Pedidos'
import Analisis from './components/Analisis'
import { useOptionsStore } from './store/MainStore'

function App(): JSX.Element {
  const { option } = useOptionsStore()
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  switch (option) {
    case 'Inicio':
      return (
        <main>
          <Menu />
          <Start />
        </main>
      )

    case 'Pedidos':
      return (
        <main>
          <Menu />
          <Pedidos />
        </main>
      )

    case 'Analisis':
      return (
        <main>
          <Menu />
          <Analisis />
        </main>
      )

    default:
      return (
        <main>
          <Menu />
          <Start />
        </main>
      )
  }
}

export default App
