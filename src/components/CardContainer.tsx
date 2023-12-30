import { Card, Id } from '../types'
import { useColumns } from './store/useColumns'

interface CardProps {
  card: Card
  columnId: Id
}

export const CardContainer = (props: CardProps) => {
  const { id, title, description } = props.card

  const { editCardDescription } = useColumns()

  const onInputChange = (newDescription: string) => {
    editCardDescription(newDescription, id, props.columnId)
  }

  return (
    <div className='h-fit w-full p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md flex flex-col'>
      {title}
      <label>
        <input
          value={description}
          onChange={e => onInputChange(e.target.value)}
          placeholder='Content, incredible content, a lot of content...'
          className='bg-[#1E2733] w-full px-4 py-8'
        />
      </label>
    </div>
  )
}
