
function CategoryCard({ category }) {
  return (
    <div className='w-full h-full bg-gradient-to-tr from-primary to-[#ff6e1a] rounded grid place-items-center py-12 animate__animated animate__slideInUp'>
      <p className="text-xl capitalize font-black text-white">{category.name}</p>
    </div>
  )
}

function CategoriesSection({ title, loading, categories }) {
  return (
    <div >
      <div className="grid place-items-center">
        <h1 className="pl-8 my-8 text-3xl uppercase font-black bg-gradient-to-r from-primary  to-[#ff9f1a] inline-block text-transparent bg-clip-text text-center">{title}</h1>
      </div>
      <div className="grid grid-cols-5 gap-4 place-items-center">
        <CategoryCard category={{ name: 'Futbol' }} />
        <CategoryCard category={{ name: 'Tenis' }} />
        <CategoryCard category={{ name: 'Padel' }} />
        <CategoryCard category={{ name: 'Rugby' }} />
        <CategoryCard category={{ name: 'Voley' }} />
      </div>
    </div>
  )
}

export default CategoriesSection