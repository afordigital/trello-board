import { Card } from '../types'

type CardProps = {
  card: Card
}

export const CardContainer = (props: CardProps) => {
  return (
    <div className='h-fit w-full p-4 bg-mainBackgroundColor border-2 border-columnBackgroundColor rounded-md flex flex-col'>
      CardContainer
    </div>
  )
}
