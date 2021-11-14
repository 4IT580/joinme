import image from '../assets/logo_pink_nobackground.png'
import classNames from 'classnames'

export default function MenuButtons() {
  return (
    <div>
      <img src={image} className="object-contain p-4" />
     <button type="button"
            className=" bg-graymenubutton rounded-xl w-14 h-14 ml-2 mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mailbox p-3" viewBox="0 0 24 24" stroke-width="1.2" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 21v-6.5a3.5 3.5 0 0 0 -7 0v6.5h18v-6a4 4 0 0 0 -4 -4h-10.5" />
  <path d="M12 11v-8h4l2 2l-2 2h-4" />
  <path d="M6 15h1" />
</svg>
</button>
<button type="button"
            className=" bg-graymenubutton rounded-xl w-14 h-14 ml-2 mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" className="p-3" fill="none" viewBox="0 0 24 24" stroke="white">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
</svg>
</button>
<button type="button"
            className=" bg-graymenubutton rounded-xl w-14 h-14 ml-2 mb-3">
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar-event p-3"  viewBox="0 0 24 24" stroke-width="1.2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <rect x="4" y="5" width="16" height="16" rx="2" />
  <line x1="16" y1="3" x2="16" y2="7" />
  <line x1="8" y1="3" x2="8" y2="7" />
  <line x1="4" y1="11" x2="20" y2="11" />
  <rect x="8" y="15" width="2" height="2" />
</svg>
</button>
<button type="button"
            className=" bg-graymenubutton rounded-xl w-14 h-14 ml-2 mb-3">
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-dashed p-3"  viewBox="0 0 24 24" stroke-width="1.5" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
  <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
  <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
  <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
  <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
  <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
  <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
  <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
</svg>
</button>
<button type="button" 
            className=" bg-graymenubutton rounded-xl w-14 h-14 ml-2 mb-3">
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user p-3"  viewBox="0 0 24 24" stroke-width="1.2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <circle cx="12" cy="7" r="4" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>
</button>

    </div>
  )
}
