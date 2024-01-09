import { useEffect, useRef, useState } from 'react'
import { Minus, GripVertical } from 'lucide-react'
import { Card, Id } from '../types'
import { useColumns } from './store/useColumns'
import { handleReaderResponse } from '../utils/handleReader'
import { useSortableConf } from '../hooks/useSortableConf'
import { CardDetail } from './CardDetail'

interface CardProps {
  card: Card
  columnId: Id
}

export const CardContainer = (props: CardProps) => {
  const [isOpened, setIsOpened] = useState(false)
  const { id, title, srcImage, imageCovered } = props.card

  const { editCardTitle, addCardImage, deleteCard } = useColumns()

  const { isDragging, style, setNodeRef, attributes, listeners } =
    useSortableConf(undefined, props.card)

  const handleTitleChange = (newTitle: string) => {
    editCardTitle(newTitle, id, props.columnId)
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
      addCardImage(srcImg as string, id, props.columnId)
    } else {
      alert('Image type is not valid')
    }
  }

  const handleDeleteCard = () => {
    deleteCard(id, props.columnId)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-fit w-full opacity-50 p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md"
      />
    )
  }

  return (
    <>
      {isOpened && (
        <CardDetail
          closeDetails={closeDetails}
          columnId={props.columnId}
          card={props.card}
        />
      )}
      <div
        ref={setNodeRef}
        style={style}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => {
          if ((e.target as HTMLInputElement).id === 'input-name') return
          setIsOpened(true)
          e.stopPropagation()
        }}
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDrop={handleImageDropped}
        className="h-fit w-full gap-y-4 p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md flex flex-col"
      >
        <label className="w-full flex items-center">
          <input
            value={title}
            id="input-name"
            onChange={(e) => handleTitleChange(e.target.value)}
            className="bg-transparent rounded-[4px] mr-2 px-4 pt-2 flex-grow"
          />
          <Minus onClick={handleDeleteCard} className="cursor-pointer" />
          <GripVertical {...attributes} {...listeners} />
        </label>

        {imageCovered && (
          <div className="relative">
            <img
              src={srcImage ? srcImage : ''}
              alt="Image Preview"
              style={{ display: srcImage ? 'block' : 'none' }}
            />
          </div>
        )}
      </div>
    </>
  )
}
