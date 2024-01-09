import { X } from 'lucide-react'
import { Card, Id } from '../types'
import { useColumns } from './store/useColumns'

type Props = {
  closeDetails: () => void
  card: Card
  columnId: Id
}

export const CardDetail = (props: Props) => {
  const { id, title, srcImage, description, imageCovered } = props.card
  const { editCardTitle, editCardDescription, addCardImage, editCardIsCover } =
    useColumns()

  const handleTitleChange = (newTitle: string) => {
    editCardTitle(newTitle, id, props.columnId)
  }

  const handleDescriptionChange = (newDescription: string) => {
    editCardDescription(newDescription, id, props.columnId)
  }

  const handleImgIsCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    editCardIsCover(e.target.checked, id, props.columnId)
  }

  const deleteImage = () => {
    if (srcImage === '') return
    addCardImage('', id, props.columnId)
  }

  return (
    <div
      id='card-container'
      className='fixed w-screen h-screen flex justify-center items-center inset-1/2 transform -translate-x-1/2 -translate-y-1/2'
    >
      <div className='w-fit min-w-[500px] flex flex-col gap-y-4 p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor'>
        <X
          onClick={() => {
            props.closeDetails()
          }}
          className='text-customWhite'
        />

        <label className='w-full flex items-center'>
          <input
            value={title}
            id='input-name'
            onChange={e => handleTitleChange(e.target.value)}
            className='bg-transparent rounded-[4px] mr-2 px-2 pt-2 flex-grow'
          />
        </label>

        <label>
          <textarea
            value={description}
            onChange={e => handleDescriptionChange(e.target.value)}
            className='bg-[#1E2733] p-4 rounded-[4px] text-customWhite h-[100px] w-full'
          />
        </label>

        <div>
          <input
            type='checkbox'
            checked={imageCovered}
            id='cover'
            name='cover'
            onChange={handleImgIsCover}
          />
          <label htmlFor='cover' className='ml-2'>
            Put image as cover
          </label>
          {srcImage && (
            <>
              <button
                onClick={() => {
                  deleteImage()
                }}
                className='absolute top-0 left-0 right-0 z-20 bg-[#1E2733] rounded-[4px] py-2 hover:bg-slate-700'
              >
                Delete
              </button>
              <img
                src={srcImage}
                alt={`img-${title}`}
                className='max-w-[200px] mt-4'
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
