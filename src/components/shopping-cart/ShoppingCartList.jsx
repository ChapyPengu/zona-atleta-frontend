import ShoppingCartCard from './ShoppingCartCard'

function ShoppingCartList({ products, onClickMoreProduct, onClickLessProduct, onClickDeleteProduct }) {

  return (
    <div className='grid grid-cols-2 gap-4 col-start-1 col-end-3'>
      {
        products.map((p, i) => (
          <ShoppingCartCard
            key={i}
            product={p}
            onClickLessProduct={onClickLessProduct}            
            onClickMoreProduct={onClickMoreProduct}
            onClickDeleteProduct={onClickDeleteProduct}
          />
        ))
      }
    </div>
  )
}

export default ShoppingCartList