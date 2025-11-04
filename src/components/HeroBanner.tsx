import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import banner1 from "../assets/images/banner-main-1.png";
import banner2 from "../assets/images/banner-main-2.png";

export default function HeroBanner() {
    return (
        <div>
            <Carousel
            showStatus={false}
            showThumbs={false}
            autoPlay
            infiniteLoop
            >
                <div>
                    <img src={banner1} className="rounded-xl" />
                </div>
                <div>
                    <img src={banner2} className="rounded-xl" />
                </div>
            </Carousel>

        </div>
    )
}
