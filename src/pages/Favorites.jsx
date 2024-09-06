import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ClientService from '../services/ClientService'
import { useUser } from '../contexts/UserContext'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { toast } from 'react-toastify'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function FavoriteCard({ product }) {

  const user = useUser()

  return (
    <div className='px-4 py-2 rounded-md shadow-md flex items-start justify-between'>
      <div className='flex gap-8'>
        <div>
          <img className='w-32 h-32' src={`${BACKEND_URL}/${product.image}`} />
        </div>
        <div>
          <p className='text-xl font-medium'>{product.name}</p>
          <div className='mt-4'>
            <Link className='hover:text-primary hover:underline' to={`/product/${product.id}`}>
              Ir al producto
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Button onClick={async () => {
          try {
            await ClientService.deleteFavorite(user.id, product.id)
            toast('Se elimino con exito')
          } catch(e) {
            toast('Error inesperado')
          }
        }}>Eliminar de favoritos</Button>
      </div>
    </div>
  )
}
function Favorites() {

  const [favorites, setFavorites] = useState([])

  const user = useUser()

  useEffect(() => {
    async function getFavorites() {
      try {
        const data = await ClientService.getFavorites(user.id)
        setFavorites(data)
      } catch (e) {
        console.log(e)
      }
    }
    getFavorites()
  })
  return (
    <div className='max-w-[1024px] mx-auto py-32'>
      <div>
        <h4 className='text-2xl font-bold pl-8 uppercase text-primary my-8'>Tus favoritos</h4>
      </div>
      <div>
        {
          favorites.map((f, i) => <FavoriteCard key={i} product={f} />)
        }
      </div>
    </div>
  )
}

export default Favorites