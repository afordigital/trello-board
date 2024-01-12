import React from 'react';

interface Props {
  title: string;
  message: string;
  open: boolean;
  onSucces: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({ title, message, open, onCancel, onSucces }: Props) {
  if (!open) return null;
  return (
    <div
      id='card-container'
      className='fixed w-screen h-screen flex justify-center items-center inset-1/2 transform -translate-x-1/2 -translate-y-1/2'
      onClick={onCancel}
    >
      <div className='absolute w-screen h-screen flex justify-center items-center left-0 top-0'>
        <div className='w-fit min-w-[500px] z-1 flex flex-col gap-y-4 p-4 py-8 rounded bg-mainBackgroundColor border-2 border-columnBackgroundColor' onClick={(e)=> e.stopPropagation()}>
          <div className='mb-2'>
            <h2 className='text-red-500 bold text-xl mb-2'>{title}</h2>
            <p>{message}</p>
          </div>
          <footer className='flex gap-x-4 justify-end'>
            <button className='bg-red-8 rounded-[4px] h-fit p-2' onClick={onSucces}>yes, delete</button>
            <button className='bg-slate-7 rounded-[4px] h-fit p-2' onClick={onCancel}>no, Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  );
}
