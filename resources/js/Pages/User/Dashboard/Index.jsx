import Flickity from "react-flickity-component";
import Authenticated from "@/Layouts/Authenticated/Index";
import FeaturedMovie from "@/Components/FeaturedMovies";
import MovieCard from "@/Components/MovieCard";
import { Head } from "@inertiajs/react";

export default function Dashboard({auth, all, featured}){
    console.log(auth);

    const flickityOptions = {"cellAlign": "left",
    "contain": true,
    "groupCells": 1,
    "wrapAround": false,
    "pageDots": false,
    "prevNextButtons": false,
    "draggable": ">1"
    }
    return (
        <Authenticated
        auth={auth}>
            <Head title="Dashboard" >
                <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />

            </Head>
            {/* <!-- Featured --> */}
                <div>
                    <div className="font-semibold text-[22px] text-black mb-4">Featured Movies</div>
                    <Flickity className="gap-[30px]" options={flickityOptions}>
                        {featured?.map((featured) => (
                            <FeaturedMovie
                            key={featured.id}
                            slug={featured.slug}
                            title={featured.name}
                            category={featured.category}
                            rating={featured.rating}
                            poster={featured.poster}>
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
                        {all.map((all) => (
                            <MovieCard
                            key={all.id}
                            slug={all.slug}
                            title={all.name}
                            category={all.category}
                            rating={all.rating}
                            poster={all.poster}>
                            </MovieCard>
                        ))}

                    </Flickity>
                </div>
                {/* <!-- /Continue Watching --> */}
        </Authenticated>
    )
}
