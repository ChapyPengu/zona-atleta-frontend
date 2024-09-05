
function CategoryCard({ category }) {
  return (
    <div className='w-full h-full bg-gray-400 rounded-md shadow-sm grid place-items-center py-16'>
      <p className="text-lg capitalize">{category.name}</p>
    </div>
  )
}

function CategoriesSection({ loading, categories }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {
        categories.map((c, i) => <CategoryCard key={i} category={c}/>)
      }
    </div>
  )
}

export default CategoriesSection