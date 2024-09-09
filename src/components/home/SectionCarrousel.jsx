import Carousel from 'react-multi-carousel'
import Subtitle from '../Subtitle'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

function SectionCarrousel({ title, loading, products, amount = 5 }) {

  return (
    <section>
      <Subtitle>{title}</Subtitle>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={{ ...responsive, desktop: { ...responsive.desktop, items: amount } }}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        customTransition="all 1s"
        transitionDuration={1000}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px mx-"
      >
        {
          products.map((p, i) => {
            if (loading) {
              return <div key={i} className='min-w-32 min-h-32 bg-primary rounded-sm'></div>
            }
            return <img key={i} className='' src={p.image} alt={p.name} />
          })
        }
      </Carousel>
    </section>

  )
}

export default SectionCarrousel