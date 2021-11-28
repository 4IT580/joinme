import { DateTime } from 'luxon'
import Button from '../atoms/Button'

export default function EventDetails({ event }) {
  return (
    <div className={ 'h-full flex flex-col' }>
      <div className='bg-black w-full h-80 rounded-xl'>
        <img src={ event.image } alt='image' />
      </div>
      <div className='p-4 '>
        <div className='py-2 text-gray-700'>From { DateTime.fromISO(event.from).toFormat('D, T') } to { DateTime.fromISO(event.to).toFormat('D, T') }</div>
        <div className='text-3xl font-bold'>{ event.name }</div>
        <div className='text-gray-700'>{ event.place }</div>
        <div className='text-xl text-gray-500 my-4'>Details</div>
        <div className='text-gray-700'>{ event.description }</div>
      </div>
      <div className='flex-grow' />
      <div className='uppercase text-gray-500 font-bold'>Attendees</div>
      <div className='bg-gray-500 w-full h-16 rounded-full p-5'>coming soon</div>
      <div className='flex felx-row justify-center gap-1 p-1 pt-5 w-full'>
        <Button className={ 'w-2/3' }>Share Event</Button> <Button className={ 'w-1/3' }>Leave</Button>
      </div>
    </div>
  )
}
