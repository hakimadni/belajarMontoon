import Flickity from "react-flickity-component";
import Authenticated from "@/Layouts/Authenticated/Index";
import FeaturedMovie from "@/Components/FeaturedMovies";
import MovieCard from "@/Components/MovieCard";
import { Head } from "@inertiajs/react";
export default function Dashboard(){
    const flickityOptions = {"cellAlign": "left",
    "contain": true,
    "groupCells": 1,
    "wrapAround": false,
    "pageDots": false,
    "prevNextButtons": false,
    "draggable": ">1"
    }
    return (
        <Authenticated>
            <Head title="Dashboard" >
                <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />

            </Head>
            {/* <!-- Featured --> */}
                <div>
                    <div className="font-semibold text-[22px] text-black mb-4">Featured Movies</div>
                    <Flickity className="gap-[30px]" options={flickityOptions}>
                        {[1,2,3,4].map(i => (
                            <FeaturedMovie 
                            key={i} 
                            slug="the-batman-in-love" 
                            title={`The Batman in Love ${i}`} 
                            category="Comedy" 
                            rating={i +1} 
                            poster="/images/featured-1.png">
                            </FeaturedMovie>
                        ))}
                    </Flickity>
                </div>
                {/* <!-- /Featured --> */}

                {/* <!-- Browse --> */}
                <div className="mt-5">
                    <div className="font-semibold text-[22px] text-black mb-4">Browse</div>
                    <Flickity className="gap-[30px]" options={flickityOptions}>
                        {/* <!-- Movies 1 --> */}
                        {[1,2,3,4,5,6].map(i => (
                            <MovieCard 
                            key={i} 
                            slug="the-batman-in-love" 
                            title={`Kucing Meong ${i}`} 
                            category="Comedy" 
                            poster="/images/browse-1.png">
                            </MovieCard>
                        ))}
                        
                    </Flickity>
                </div>
                {/* <!-- /Continue Watching --> */}
        </Authenticated>
    )
}