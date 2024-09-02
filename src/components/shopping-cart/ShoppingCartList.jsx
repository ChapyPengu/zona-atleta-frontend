import ShoppingCartCard from './ShoppingCartCard'

function ShoppingCartList({ products, onClickMoreProduct, onClickLessProduct, onClickDeleteProduct }) {

  return (
    <div className='shopping-cart-list'>
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