import Carousel from 'react-multi-carousel'
import { API_URL } from '../../config/config'

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
        <h1 className="pl-8 my-8 text-3xl uppercase font-black bg-gradient-to-r from-primary  to-[#ff9f1a] inline-block text-transparent bg-clip-text">{title}</h1>

      {/* <h4 className='text-4xl font-semibold my-8'>{title}</h4> */}
      {/* <div className="w-96 h-48 rounded-md  p-0.5">
        <div className="w-full h-full rounded-md  flex items-center justify-center">
          <p className="text-2xl font-manrope font-bold text-white">Pagedone Design System</p>
        </div>
      </div> */}
      {/* <div className='bg-primary py-16 rounded bg-gradient-to-tr from-primary to-[#ff9f1a] px-8 w-full min-h-32'> */}
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
            console.log(loading)
            if (loading) {
              return <div key={i} className='min-w-32 min-h-32 bg-primary rounded-sm'></div>
            }
            return <img key={i} className='' src={`${p.image}`} alt={p.name} />
          })
        }
      </Carousel>
      {/* </div> */}
    </section>

  )
}

export default SectionCarrousel