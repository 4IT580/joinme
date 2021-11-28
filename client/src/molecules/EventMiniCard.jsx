import { DateTime } from 'luxon'
import { UserIcon } from '@heroicons/react/solid'

export default function EventMiniCard({ event, onClick }) {
  return (
    <div className='rounded-xl bg-white my-2 p-2 cursor-pointer' onClick={() => onClick()} >
      <div className='flex flex-row'>
        <div>
          <img src={ event.image } alt='event' className='w-24 h-20 object-cover rounded-lg bg-black' />
        </div>
        <div className='px-2'>
          <div className='font-bold text-xl'>
            { event.name }
          </div>
          <div>
            { DateTime.fromISO(event.from).toFormat("ccc D, T") }
          </div>
          <div className={'flex flex-row'}>
            <UserIcon className='w-5 pr-1' /> { event.user.name }
          </div>
        </div>
      </div>
    </div>
  )
}
