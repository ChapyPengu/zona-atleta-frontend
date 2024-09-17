import Carousel from 'react-multi-carousel'
import Utilities from '../../utilities/Utilities'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

function Header() {

  const images = Utilities.createArray(8).map((item, i) => `/sliders/slider-${i + 1}.jpg`)
  const topImages = Utilities.createArray(4).map((item, i) => `/sliders/slider-top-${i + 1}.jpg`)
  const bottomImages = Utilities.createArray(3).map((item, i) => `/sliders/slider-bottom-${i + 1}.jpg`)

  return (
    <header className=''>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        customTransition='all 1s'
        transitionDuration={750}
        containerClass='carousel-container h-32'
        dotListClass='custom-dot-list-style'
        arrows={false}
        itemClass='carousel-item-padding-40-px.3'
        className=''
      >

        {
          topImages.map((image, i) => <img key={i} className='h-32 object-cover' src={image} />)
        }
      </Carousel>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        customTransition='all 1s'
        transitionDuration={1000}
        containerClass='carousel-container h-64'
        dotListClass='custom-dot-list-style'
        arrows={false}
        showDots={true}
        itemClass='carousel-item-padding-40-px.3'
        className=''
      >

        {
          images.map((image, i) => <img key={i} className='h-64 object-cover' src={image} />)
        }
      </Carousel>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        customTransition='all 1s'
        transitionDuration={1000}
        containerClass='carousel-container mt-8'
        dotListClass='custom-dot-list-style'
        arrows={false}
        showDots={true}
        itemClass='carousel-item-padding-40-px.3'
        className=''
      >

        {
          bottomImages.map((image, i) => <img key={i} className='h-32 object-cover' src={image} />)
        }
      </Carousel>
    </header>
  )
}

export default Header