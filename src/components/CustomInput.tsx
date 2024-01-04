import { ComponentProps } from 'react'

export const TextLikeInput = (props: ComponentProps<'input'>) => {
  console.log(props.value)
  return (
    <div className='inline-grid'>
      <input
        {...props}
        className='bg-transparent w-full b-0 p-2 col-start-1 col-end-2 row-start-1 row-end-2 text-[14px]'
        size={1}
      />
      <span className='invisible col-start-1 col-end-2 row-start-1 row-end-2 whitespace-pre-wrap text-[14px]'>
        {props.value}
      </span>
    </div>
  )
}
