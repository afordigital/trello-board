import { Card, Id } from '../types'
import { useColumns } from './store/useColumns'

interface CardProps {
  card: Card
  columnId: Id
}

export const CardContainer = (props: CardProps) => {
  const { id, title, description } = props.card

  const { editCardTitle, editCardDescription } = useColumns()

  const handleTitleChange = (newTitle: string) => {
    editCardTitle(newTitle, id, props.columnId)
  }

  const handleDescriptionChange = (newDescription: string) => {
    editCardDescription(newDescription, id, props.columnId)
  }

  return (
    <div className='h-fit w-full p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md flex flex-col'>
      <label>
        <input
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          className='bg-[#1E2733] w-full px-4 pt-2'
        />
      </label>
      <label>
        <input
          value={description}
          onChange={e => handleDescriptionChange(e.target.value)}
          placeholder='Content, incredible content, a lot of content...'
          className='bg-[#1E2733] w-full px-4 py-8'
        />
      </label>
    </div>
  )
}
