import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useMediaQuery } from 'react-responsive'
import desktopBanner1 from "../assets/images/banner-main-1.png";
import desktopBanner2 from "../assets/images/banner-main-2.png";
import mobileBanner1 from "../assets/images/banner-main-1-mobile.png";
import mobileBanner2 from "../assets/images/banner-main-2-mobile.png";

export default function HeroBanner() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

    const slides = [
        {
            desktopBanner: desktopBanner1,
            mobileBanner: mobileBanner1,
            legend: 'home-hero-banner-1'
        },
        {
            desktopBanner: desktopBanner2,
            mobileBanner: mobileBanner2,
            legend: 'home-hero-banner-2'
        },
    ];

    return (
        <div>
            <Carousel
                showStatus={false}
                showThumbs={false}
                autoPlay
                infiniteLoop
            >
                {slides.map((slide, index) => (
                    <div key={index}>
                        <img
                            src={isTabletOrMobile ? slide.mobileBanner : slide.desktopBanner}
                            alt={slide.legend}
                            className="rounded-xl"
                        />
                    </div>
                ))}
            </Carousel>

        </div>
    )
}
