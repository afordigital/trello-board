import { X } from 'lucide-react'
import { Card } from '../types'

type Props = {
  closeDetails: () => void
  card: Card
}

export const CardDetail = (props: Props) => {
  return (
    <div className='fixed w-screen h-screen flex justify-center items-center inset-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className='w-[200px]  p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor'>
        <X
          onClick={() => {
            props.closeDetails()
          }}
          className='text-customWhite'
        />
        <p>{props.card.title}</p>
        <div>
          <input
            type='checkbox'
            checked={props.card.imageCovered}
            id='cover'
            name='cover'
          />
          <label htmlFor='cover'>Put image as cover</label>
        </div>
      </div>
    </div>
  )
}
