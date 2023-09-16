import Authenticated from "@/Layouts/Authenticated/Index";
import SubsCard from "@/Components/SubsCard";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function SubsPlan({ auth, subsPlans }) {
    const flickityOptions = {
        cellAlign: "left",
        contain: true,
        groupCells: 1,
        wrapAround: false,
        pageDots: false,
        prevNextButtons: false,
        draggable: ">1",
    };

    const selectSubs = (id) => {
        Inertia.post(
            route("user.dashboard.subsplan.userSub", {
                subsPlan: id,
            })
        );
    };
    return (
        <Authenticated auth={auth}>
            <Head title="Subscription Plan">
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                />
            </Head>

            {/* <!-- START: Content --> */}
            <div className="py-20 flex flex-col items-center">
                <div className="text-black font-semibold text-[26px] mb-3">
                    Pricing for Everyone
                </div>
                <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                    Invest your little money to get a whole new experiences from
                    movies.
                </p>

                {/* <!-- Pricing Card --> */}
                <div className="flex justify-center gap-10 mt-[70px]">
                    {subsPlans.map((subsPlan, index) => (
                        <SubsCard
                            key={index}
                            isPremium={subsPlan.name === "Premium"}
                            name={subsPlan.name}
                            price={subsPlan.price}
                            durationMonths={subsPlan.duration_months}
                            features={JSON.parse(subsPlan.features)}
                            id={subsPlan.id}
                            onSelect={() => selectSubs(subsPlan.id)}
                        />
                    ))}
                </div>
                {/* <!-- /Pricing Card --> */}
            </div>
            {/* <!-- END: Content --> */}
        </Authenticated>
    );
}
