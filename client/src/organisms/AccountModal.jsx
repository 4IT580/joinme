import { XIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import image from '../assets/user.jpg'
import InlineInput from '../atoms/InlineInput'
import VerticalLine from '../atoms/VerticalLine'
import Button from '../atoms/Button'

function EditTab({ user, updateUser }) {
  const tags = ['Concerts', 'Parties', 'Games', 'Sports', 'Art', 'Fashion', 'Movies', 'Tech', 'Outdoors', 'Traveling', 'Hiking', 'Volunteer', 'Cooking', 'Coffee', 'Food', 'Drinks']

  function handleTagClick(tag) {
    console.log(user.tags, tag)
    if (user.tags.includes(tag)) {
      updateUser({
        ...user,
        tags: user.tags.filter(t => t !== tag),
      })
    } else {
      updateUser({
        ...user,
        tags: [...user.tags, tag],
      })
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <div className={ 'flex flex-col w-1/3 items-center' }>
          <img src={ image } alt='image' className={ 'w-24 rounded-full' } />
          <button className={ 'bg-gray-200 rounded-xl mt-2 font-bold uppercase text-xs p-2' }>change photo</button>
        </div>
        <div className='flex flex-col w-2/3 justify-between'>
          <InlineInput value={ user.name } onChange={ (e) => updateUser({ ...user, name: e }) } />
          <InlineInput value={ user.username } onChange={ (e) => updateUser({ ...user, username: e }) } />
          <InlineInput value={ user.location } onChange={ (e) => updateUser({ ...user, location: e }) } />
        </div>
      </div>
      <div className={ 'h-24' }>
        <textarea
          className='outline-none bordered border-black border-2 mt-4 w-full px-4 pt-2  h-full' value={ user.bio } onChange={ (e) => updateUser({
          ...user,
          bio: e.target.value,
        }) } />
      </div>
      <div className={ 'mt-8' }>
        <InlineInput
          value={ 'Choose up to 6 interests' } onChange={ () => {
        } } />
      </div>
      <div className={ 'flex flex-row flex-wrap mt-4' }>
        { tags.map((tag, index) => (
          <div key={ index } className={ 'w-1/4 h-10' }>
            <div className={ 'mx-1' }>
              <button className={ `border-${ user.tags.includes(tag) ? 'red' : 'gray' }-900 border-2 rounded-xl font-bold uppercase text-xs p-2 w-full` } onClick={ () => handleTagClick(tag) }>{ tag }</button>
            </div>
          </div>
        )) }
      </div>
      <div className={ 'flex flex-row justify-between mt-3' }>
        <div className={ 'w-1/2 pr-2' }>
          <Button className={ 'bg-gray-200 text-black w-full border-none' }>Cancel</Button>
        </div>
        <div className={ 'w-1/2 pl-2' }>
          <Button className={ 'w-full' }>save changes</Button>
        </div>
      </div>
    </div>
  )
}

function SettingsTab() {
  return (<div>settings</div>)
}

export default function AccountModal({ closeModal }) {
  const [activeTab, setActiveTab] = useState('edit')
  const editActive = activeTab === 'edit'
  const [user, setUser] = useState({
    name: 'John Doe',
    username: 'johnDoe',
    location: 'Prague',
    bio: 'some text',
    tags: ['Art', 'Fashion', 'Movies', 'Tech'],
  })
  return (
    <div className={ 'bg-white w-1/2 m-auto pt-12 rounded-3xl relative h-full' }>
      <div className={ 'w-96 m-auto' }>
        <div className='flex flex-row justify-between cursor-pointer my-4'>
          <span className={ `font-bold text-2xl ${ editActive ? '' : 'text-gray-400' }` } onClick={ () => setActiveTab('edit') }>Edit profile</span>
          <VerticalLine />
          <span className={ `font-bold text-2xl ${ editActive ? 'text-gray-400' : '' }` } onClick={ () => setActiveTab('settings') }>Settings</span>
        </div>
        { editActive ? <EditTab user={ user } updateUser={ (u) => setUser(u) } /> : <SettingsTab /> }
      </div>

      <div className={ 'absolute bg-gray-100 w-10 h-10 rounded-xl top-8 right-8 cursor-pointer' } onClick={ closeModal }>
        <XIcon />
      </div>
    </div>
  )
}
