import React from 'react'
import ReactDOM from 'react-dom'
import 'tailwindcss/tailwind.css'
import { GOOGLE_API_KEY } from './config'
import App from './App'

const script = document.createElement('script')
script.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`)
script.setAttribute('async', true)
script.setAttribute('defer', true)
document.head.appendChild(script)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
