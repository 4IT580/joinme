import { useAuth } from '../utils/auth'
import image from '../assets/user.jpg'
import { useEffect, useState } from 'react'
import { CogIcon } from '@heroicons/react/solid'
import AccountModal from './AccountModal'

export default function AccountInfo() {
  const { auth } = useAuth()
  const statistics = [
    { label: 'Events', value: 17 },
    { label: 'Followers', value: 152 },
    { label: 'Following', value: 156 },
    { label: 'Circles', value: 5 },
  ]
  const [tags, setTags] = useState([
    { label: 'Art', color: 'red' },
    { label: 'Fashion', color: 'blue' },
    { label: 'Movies', color: 'green' },
    { label: 'Tech', color: 'yellow' },
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='rounded-3xl relative flex flex-col justify-center shadow-md bg-white p-6 py-4 mt-4 w-96 h-full'>
      <div className='flex flex-col justify-center items-center'>
        <img src={ image } alt='user' className='w-44 rounded-full' />
        <span className={ 'text-xl font-bold' }>Name</span> <span className={ 'text-lg' }>username</span>
        <span className={ 'text-lg text-gray-500' }>Prague</span>
      </div>
      <div className='flex flex-row justify-between mt-6'>
        { statistics.map((stat, index) => (
          <div className='font-bold text-center ' key={ index }>{ stat.value }<br />{ stat.label }</div>)) }
      </div>
      <div className='flex flex-col mt-6'>
        <span className={ 'font-bold uppercase text-sm' }>About John</span> <span className='pl-6 pt-2'>some text</span>
      </div>
      <div className='flex flex-col mt-6'>
        <span className={ 'font-bold uppercase text-sm' }>Interests</span>
        <div className={ 'flex flex-row flex-wrap mt-2' }>
          { tags.map((tag, index) => (
            <div key={ index } className={ 'w-1/3 h-10' }>
              <div className={ 'mx-1' }>
                <button className={ `border-${ tag.color }-900 border-2 rounded-xl uppercase text-xs p-2 py-1 w-full` }>{ tag.label }</button>
              </div>
            </div>
          )) }
        </div>
      </div>
      <div className={ 'flex-grow' } />
      <div className={ 'text-center m-0' }>
        <button className={ 'px-20 py-2 bg-primary text-white rounded-xl uppercase font-bold' }>Create event</button>
      </div>

      <div className={ 'absolute bg-gray-100 w-12 h-12 rounded-xl top-4 left-4 cursor-pointer' } onClick={ () => setIsModalOpen(true) }>
        <CogIcon />
      </div>

      { isModalOpen && (
        <div className={ 'fixed top-0 left-0 w-full h-full bg-opacity-50 bg-gray-300 py-12 ' }>
          <AccountModal closeModal={ () => setIsModalOpen(false) } />
        </div>
      ) }

    </div>)
}
