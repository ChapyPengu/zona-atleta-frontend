import ProductCarrousel from "./product/ProductCarrousel"
import MagicButton from '../components/MagicButton'

function Header() {
  return (
    <header className='header'>
      <section className='header__container'>
        <div className="header__content">
          <h1 className='header__title'>Tienda de articulos deportivos</h1>
          <p className='header__paragraph'>Articulos de calidad, con mas de 10 años de experiencia</p>
          <MagicButton>Ver Productos</MagicButton>
        </div>
        <figure className='header__figuro'>
          <ProductCarrousel />
        </figure>
      </section>
    </header>
  )
}

export default Header