import { Card } from '../../types'
import { X, Image } from 'lucide-react'
import { useCard } from './hooks/useCard'
import { useState } from 'react'

type Props = {
  closeDetails: () => void
  card: Card
}

const defaultText = 'Click or drag image here to upload'
const defaultTextDrag = 'Drop image here'
export const CardDetail = (props: Props) => {
  const { title, srcImage, description, imageCovered } = props.card
  const [loadFileText, setLoadFileText] = useState(defaultText)
  const { handleTitleChange, handleDescriptionChange, handleImgIsCover, deleteImage, handleUploadImage } = useCard(props.card)

  const stopDefaults = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

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
          {srcImage ? (
            <>
              <div className='relative w-fit'>
                <img
                  src={srcImage}
                  alt={`img-${title}`}
                  className='max-w-[200px] mt-4 aspect-w-16 aspect-h-9 rounded-md object-cover'
                />
                <span className='flex text-xs items-center bg-red-5 w-fit p-1 rounded-md absolute top-[-10px] right-[-10px] cursor-pointer'
                  onClick={deleteImage}
                >
                  <X size='16px' />
                </span>
              </div>
              <input
                type='checkbox'
                checked={imageCovered}
                id='cover'
                name='cover'
                onChange={handleImgIsCover}
              />
              <label htmlFor='cover' className='ml-2 text-xs'>
                Put image as cover
              </label>
            </>
          ) : (
            <>
              <label
                htmlFor='file-upload'
                onDragEnter={(e)=>{
                  stopDefaults(e)
                  setLoadFileText(defaultTextDrag)
                }}
                onDragOver={stopDefaults}
                onDragLeave={(e)=>{
                  stopDefaults(e)
                  setLoadFileText(defaultText)
                }}
                onDrop={(e) => {
                  stopDefaults(e)
                  setLoadFileText(defaultText)
                  if (e.dataTransfer.files) handleUploadImage(e.dataTransfer.files)
                }}
                className='flex items-center h-20 gap-2 p-4 rounded-md border-2 border-dashed border-columnBackgroundColor cursor-pointer'
              >
                <Image size='24px' />
                <span className='pointer-events-none'>{loadFileText}</span>
              </label>
              <input type="file" accept='image/*' id="file-upload" style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files) handleUploadImage(e.target.files)
                }} />
            </>


          )}
        </div>
      </div>
    </div>
  )
}
