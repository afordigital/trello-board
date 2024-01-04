import { useRef } from 'react'
import { Minus } from 'lucide-react'
import { Card, Id } from '../types'
import { useColumns } from './store/useColumns'
import { handleReaderResponse } from '../utils/handleReader'
import { useSortableConf } from '../hooks/useSortableConf'

interface CardProps {
  card: Card
  columnId: Id
}

export const CardContainer = (props: CardProps) => {
  const { id, title, description, srcImage } = props.card

  const { editCardTitle, editCardDescription, addCardImage, deleteCard } =
    useColumns()

  const { isDragging, style, setNodeRef, attributes, listeners } =
    useSortableConf(undefined, props.card)

  const handleTitleChange = (newTitle: string) => {
    editCardTitle(newTitle, id, props.columnId)
  }

  const handleDescriptionChange = (newDescription: string) => {
    editCardDescription(newDescription, id, props.columnId)
  }

  const imgRef = useRef<HTMLImageElement | null>(null)

  const handleImageDropped = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    const file = e?.dataTransfer?.files[0]

    const srcImg = await handleReaderResponse(file)

    if (srcImg) {
      if (!imgRef.current) return
      imgRef.current.src = srcImg as string
      imgRef.current.style.display = 'block'

      addCardImage(imgRef.current.src, id, props.columnId)
    } else {
      alert('Image type is not valid')
    }
  }

  const deleteImage = () => {
    if (srcImage === '') return
    addCardImage('', id, props.columnId)
  }

  const handleDeleteCard = () => {
    deleteCard(id, props.columnId)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='h-fit w-full opacity-50 p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md'
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDragOver={e => {
        e.preventDefault()
      }}
      onDrop={e => {
        handleImageDropped(e)
      }}
      className='h-fit w-full gap-y-4 p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md flex flex-col'
    >
      <label className='w-full flex'>
        <input
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          className='bg-[#1E2733] px-4 pt-2 flex-1'
        />
        <Minus onClick={handleDeleteCard} />
      </label>

      <label>
        <textarea
          value={description}
          onChange={e => handleDescriptionChange(e.target.value)}
          className='bg-[#1E2733] text-customWhite h-[100px] w-full'
        />
      </label>

      {srcImage !== '' && (
        <button
          onClick={() => {
            deleteImage()
          }}
          className='bg-[#1E2733] py-2 hover:bg-slate-700'
        >
          Delete
        </button>
      )}

      <img
        src={srcImage ? srcImage : ''}
        ref={imgRef}
        alt='Image Preview'
        style={{ display: srcImage ? 'block' : 'none' }}
      />
    </div>
  )
}
