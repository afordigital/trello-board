import { X } from 'lucide-react'
import { Card, Id } from '../../types'
import { useContext } from 'react'
import { KanbanContext } from '../store/KanbanProvider'

type Props = {
  closeDetails: () => void
  card: Card
}

export const CardDetail = (props: Props) => {
  const { id, title, srcImage, description, imageCovered } = props.card
  const {  addCardImage,editCardTitle, editCardDescription, editCardIsCover } = useContext(KanbanContext)


  const handleTitleChange = (newTitle: string) => {
    editCardTitle(newTitle, id,)
  }

  const handleDescriptionChange = (newDescription: string) => {
    editCardDescription(newDescription, id,)
  }

  const handleImgIsCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    editCardIsCover(e.target.checked, id,)
  }

  const deleteImage = () => {
    if (srcImage === '') return
    addCardImage('', id,)
  }

  return (
    <div
      id='card-container'
      className='fixed w-screen h-screen flex justify-center items-center inset-1/2 transform -translate-x-1/2 -translate-y-1/2 '
    >
      <div
        className='absolute w-screen h-screen flex justify-center items-center left-0 top-0 bg-[#00000080] cursor-pointer'
        onClick={() => {
          props.closeDetails()
        }}
      
      />
      <div className='w-fit min-w-[500px] z-[999] flex flex-col gap-y-4 p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md'>
        <X
          onClick={() => {
            props.closeDetails()
          }}
          className='text-customWhite cursor-pointer'
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
