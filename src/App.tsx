import { KanbanBoard } from './components/KanbanBoard'
import { LayoutPanelTop } from 'lucide-react'

function App () {
  return (
    <main className='w-screen h-screen font-onest flex flex-col items-center bg-[#050505] text-customWhite'>
      <h1 className='text-[#485E7A] py-10 text-2xl font-bold flex items-center justify-center'>
        <LayoutPanelTop className='mr-2' />
        Trello Board
      </h1>
      <KanbanBoard />
    </main>
  )
}

export default App
