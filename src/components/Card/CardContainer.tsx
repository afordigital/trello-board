import { useContext, useState } from 'react'
import { Minus, GripVertical } from 'lucide-react'
import { Card, Id } from '../../types'
import { handleReaderResponse } from '../../utils/handleReader'
import { useSortableConf } from '../../hooks/useSortableConf'
import { CardDetail } from './CardDetail'
import { KanbanContext } from '../store/KanbanProvider'

interface CardProps {
  card: Card
}

export const CardContainer = (props: CardProps) => {
  const [isOpened, setIsOpened] = useState(false)
  const { id, title, srcImage, imageCovered } = props.card
  const {  addCardImage,deleteCard, editCardTitle } = useContext(KanbanContext)

  const { isDragging, style, setNodeRef, attributes, listeners } =
    useSortableConf({
      type: 'Card',
      item: props.card
    })

  const handleTitleChange = (newTitle: string) => {
    editCardTitle(newTitle, id)
  }

  const closeDetails = () => {
    setIsOpened(false)
  }

  const handleImageDropped = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    const file = e?.dataTransfer?.files[0]

    const srcImg = await handleReaderResponse(file)

    if (srcImg) {
      if (!srcImg) return
      addCardImage(srcImg as string, id)
    } else {
      alert('Image type is not valid')
    }
  }

  const handleDeleteCard = () => {
    deleteCard(id)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`h-18 w-full opacity-50 p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md`}
      />
    )
  }


  return (
    <>
      {isOpened && (
          <CardDetail
            closeDetails={closeDetails}
            card={props.card}
            />
      )}
      <div
        ref={setNodeRef}
        style={style}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          if ((e.target as HTMLInputElement).id === 'input-name') return
          setIsOpened(true)
        }}
        onDrop={handleImageDropped}
        className={`h-18 w-full gap-y-4 p-x-2 overflow-y-auto bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md flex flex-col justify-center text-white cursor-pointer`}
      >
        <label className='w-full flex h-fit items-center gap-2'>
        {imageCovered && srcImage && (
            <img
              src={srcImage ? srcImage : ''}
              alt='Image Preview'
              className='w-[50px] h-fit object-cover rounded-md'
            />
        )}
          <input
            value={title}
            id='input-name'
            onChange={e => handleTitleChange(e.target.value)}
            className='bg-transparent rounded-[4px] flex-grow'
          />
          <span className='flex gap-2'>
          <Minus onClick={handleDeleteCard} className='cursor-pointer' />
          <GripVertical  {...attributes} {...listeners} onClick={(e)=>{
            e.stopPropagation()
            e.preventDefault()
          }} />
          </span>
        </label>
      
      </div>
    </>
  )
}
