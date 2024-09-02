import React from 'react'

function CategoryCard({ category }) {
  return (
    <div className='category-card'>
      <p>{category.name}</p>
    </div>
  )
}
function CategoriesCarrousel({ categories }) {

  return (
    <div className='categories-carrousel'>
      <div className='categories-carrousel__container'>
        {
          [...categories, ...categories].map((c, i) => <CategoryCard key={i} category={c} />)
        }
      </div>
    </div>
  )
}

export default CategoriesCarrousel