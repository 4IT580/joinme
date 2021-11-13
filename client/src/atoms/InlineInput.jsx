export default function InlineInput ({value, onChange}) {
  return (<div className='border-b-2 border-black'>
    <input
      className={ 'pb-1 outline-none' } type='text' value={ value } onChange={ (e) => onChange(e.target.value) } />
  </div>)
}
