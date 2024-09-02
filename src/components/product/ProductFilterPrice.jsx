function ProductFilterPrice({ start, end, getOnChange, onClick, error }) {
  return (
    <div className='product-filter__container'>
      <div className='product-filter__container-input'>
        <p>Desde:</p>
        <input value={`$${start}`} className={`product__filter-range-input ${error ? 'error' : ''}`} type='text' placeholder={`$${start}`} onChange={getOnChange('min')} onClick={onClick} />
      </div>
      <div className='product-filter__container-input'>
        <p>Hasta:</p>
        <input value={`$${end}`} className={`product__filter-range-input ${error ? 'error' : ''}`} type='text' placeholder={`$${end}`} onChange={getOnChange('max')} onClick={onClick} />
      </div>
    </div>
  )
}

export default ProductFilterPrice