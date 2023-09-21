import Authenticated from "@/Layouts/Authenticated/Index";
import SubsCard from "@/Components/SubsCard";
import { Head, router } from "@inertiajs/react"

export default function SubsPlan({ auth, subsPlans, env }) {
    const selectSubs = (id) => {
        //Inertia.post
        router.post(
            route("user.dashboard.subsplan.userSub", {
                subsPlan: id,
            }),
            {},
            {
                only:['userSub'],
                onSuccess: (page) => {
                    onSnapMidtrans(page.props.userSub);
                },
            }
        );
    };

    const onSnapMidtrans = (userSub) => {
        // console.log(userSub);
        // SnapToken acquired from previous step
        snap.pay(userSub.snapToken, {
            // Optional
            onSuccess: function (result) {
                Inertia.visit(route("user.dashboard.index"));
            },
            // Optional
            onPending: function (result) {
                console.log(result);
            },
            // Optional
            onError: function (result) {
                console.log(result);
            },
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Subscription Plan">
                <script
                    src="https://app.sandbox.midtrans.com/snap/snap.js"
                    data-client-key={env.MIDTRANS_CLIENT_KEY}
                ></script>
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
