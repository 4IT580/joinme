import * as yup from 'yup'
import Button from '../atoms/Button'
import DashboardLayout from '../organisms/DashboardLayout'
import Input from '../atoms/Input'
import { XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
import FormControl from '../molecules/FormControl'
import PeopleMenu from '../molecules/PeopleMenu'
import { useState } from 'react'

export default function EditCircle() {
  const [input, setInput] = useState('')

  const onInput = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  return (
    <DashboardLayout>
      <div className="bg-gray-100 rounded-2xl p-4 m-4">
        <div className="flex flex-row justify-start items-center">
          <Link to="/" className="block p-2">
            <XIcon className="rounded-md bg-gray-700 text-white hover:bg-gray-500 p-2 w-11" />
          </Link>
          <h1 className="text-xl font-bold">Edit circle</h1>
        </div>
        <div className="bg-white rounded-2xl grid grid-cols-2 gap-2 p-4">
          <div className="flex flex-col col-span-2 lg:col-span-1 gap-y-4 justify-between">
            <img src="https://picsum.photos/id/1005/400/250" alt="user" className="w-44 rounded-full" />
            <Formik
              initialValues={{ circleName: '', circleDescription: '' }}
              validationSchema={editCircleSchema}
              onSubmit={async (variables) => {
                console.log(
                  'Desired circle name: ' +
                    variables.circleName +
                    '\n' +
                    'Desired circle description: ' +
                    variables.circleDescription,
                )
              }}
            >
              <Form>
                <FormControl name="circleName" label="Circle name" />
                <FormControl name="circleDescription" label="Description" />
                <Button type="submit" className="mt-2">
                  Save changes
                </Button>
              </Form>
            </Formik>
          </div>
          <div className="flex flex-col col-span-2 lg:col-span-1 gap-2 bg-gray-100 rounded-2xl p-2">
            <form
              className="flex flex-col sm:flex-row gap-y-2 sm:gap-x-2 rounded-2xl"
              onSubmit={async (e) => {
                e.preventDefault()
                console.log('Adding person: ' + input)
                setInput('')
              }}
            >
              <Input placeholder="Search people..." className="flex flex-grow" value={input} onInput={onInput} />
              <Button className="flex" type="submit">
                Add
              </Button>
            </form>
            <PeopleMenu>
              <PeopleMenu.PeopleItem
                image="https://picsum.photos/id/1005/400/250"
                name="Jane"
                username="janesusername"
              />
              <PeopleMenu.PeopleItem
                image="https://picsum.photos/id/1005/400/250"
                name="Peter"
                username="petersusername"
              />
              <PeopleMenu.PeopleItem
                image="https://picsum.photos/id/1005/400/250"
                name="Michael"
                username="michaelsusername"
              />
              <PeopleMenu.PeopleItem
                image="https://picsum.photos/id/1005/400/250"
                name="John"
                username="johnsusername"
              />
              <PeopleMenu.PeopleItem
                image="https://picsum.photos/id/1005/400/250"
                name="Jake"
                username="jakesusername"
              />
            </PeopleMenu>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const editCircleSchema = yup.object({
  circleName: yup.string().required('Circle name is required'),
  circleDescription: yup.string().required('Circle description is required'),
})
