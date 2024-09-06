import Carousel from 'react-multi-carousel'

import Utilities from '../../utilities/Utilities'
import { Link } from 'react-router-dom'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

function CategoriesSection({ title }) {

  const images = Utilities.createArray(7).map((item, i) => `sliders/slider-category-${i + 1}.jpg`)

  return (
    <div >
      <div className="grid place-items-center">
        <h1 className="pl-8 my-8 text-3xl uppercase font-black bg-gradient-to-r from-primary  to-[#ff9f1a] inline-block text-transparent bg-clip-text text-center">{title}</h1>
      </div>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        customTransition="all 1s"
        transitionDuration={1000}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px mx-2"
      >
        <Link to='/category/hockey'>
          <img className='' src='sliders/slider-category-1.jpg' />
        </Link>
        <Link to='/category/tenis'>
          <img className='' src='sliders/slider-category-2.jpg' />
        </Link>
        <Link to='/category/moda'>
          <img className='' src='sliders/slider-category-3.jpg' />
        </Link>
        <Link to='/category/training'>
          <img className='' src='sliders/slider-category-4.jpg' />
        </Link>
        <Link to='/category/natacion'>
          <img className='' src='sliders/slider-category-5.jpg' />
        </Link>
        <Link to='/category/running'>
          <img className='' src='sliders/slider-category-6.jpg' />
        </Link>
        <Link to='/category/basquet'>
          <img className='' src='sliders/slider-category-7.jpg' />
        </Link>
        <Link to='/category/futbol'>
          <img className='' src='sliders/slider-category-8.jpg' />
        </Link>
      </Carousel>
    </div>
  )
}

export default CategoriesSection