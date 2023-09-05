import Authenticated from "@/Layouts/Authenticated/Index";
import SubsCard from "@/Components/SubsCard";
import { Head } from "@inertiajs/react";
export default function SubsPlan(){
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
            <Head title="Subscription Plan" >
                <link rel="stylesheet" href="https://unpkg.com/flickity@2/dist/flickity.min.css" />

            </Head>
                
                {/* <!-- START: Content --> */}
                    <div className="py-20 flex flex-col items-center">
                        <div className="text-black font-semibold text-[26px] mb-3">
                            Pricing for Everyone
                        </div>
                        <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                            Invest your little money to get a whole new experiences from movies.
                        </p>

                        {/* <!-- Pricing Card --> */}
                        <div className="flex justify-center gap-10 mt-[70px]">
                            {/* <!-- Basic --> */}
                            <SubsCard name={"Basic"} price={299000} durationMonths={3} features={["Feature 1","Feature 2","Feature 3",]} id={1}/>

                            {/* <!-- For Greatest --> */}
                            <SubsCard isPremium name={"Basic"} price={899000} durationMonths={9} features={["Feature 1","Feature 2","Feature 3","Feature 3",]} id={2}/>
                        </div>
                        {/* <!-- /Pricing Card --> */}
                    </div>
                {/* <!-- END: Content --> */}
        </Authenticated>
    )
}