import Search from '../icons/Search'

function ProductFilterName({ value, onChange }) {
  return (
    <div className='searchbar'>
      <input className='searchbar__input' value={value} type='text' onChange={onChange} placeholder='Buscar productos' />
      <Search className='searchbar__icon' />
    </div>
  )
}

export default ProductFilterName