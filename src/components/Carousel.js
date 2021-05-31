import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../Carousel.css"

export default function CarouselResp(props) {

    const {images} = props

    console.log(images)

    if (!images) {
        return <h1>Loading...</h1>
    }

    return (
        <Carousel
            showIndicators={false}
            showStatus={false}
            >
            {images.backdrops.map((e) => {
                return (
                    <div key={e.id} className="box-img-carousel">
                        <img className="img-carousel" src={`https:/image.tmdb.org/t/p/w300${e.file_path}`} alt={e.title} />
                    </div>
                    
                )
            })}
        </Carousel>
    )
}

