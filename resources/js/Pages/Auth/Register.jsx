import Input from "@/Components/TextInput";
import Button from "@/Components/PrimaryButton";
import { Link, Head, useForm } from "@inertiajs/react";
import Label from "@/Components/InputLabel";
import { useEffect } from "react";
import InputError from "@/Components/InputError";
import ValidationErrors from "@/Components/ValidationErrors";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name, event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("register"));
    };

    return (
        <>
            <Head title="Sign Up" />
            <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
                <div className="fixed top-[-50px] hidden lg:block">
                    <img
                        src="/images/signup-image.png"
                        className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]"
                        alt=""
                    />
                </div>
                <div className="py-10 flex laptopLg:ml-[680px] laptopXl:ml-[870px]">
                    <div>
                        <img src="/images/moonton-white.svg" alt="" />
                        <div className="my-[70px]">
                            <div className="font-semibold text-[26px] mb-3">
                                Sign Up
                            </div>
                            <p className="text-base text-[#767676] leading-7">
                                Explore our new movies and get <br />
                                the better insight for your life
                            </p>
                            <ValidationErrors errors={errors} />
                        </div>
                        <form className="w-[370px]" onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <Label
                                        forInput="fullname"
                                        value="Full Name"
                                    />
                                    <Input
                                        type="text"
                                        name="name"
                                        isFocused={true}
                                        value={data.name}
                                        placeholder="Your fullname..."
                                        handleChange={handleOnChange}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <Label
                                        forInput="email"
                                        value="Email Address"
                                    />
                                    <Input
                                        name="email"
                                        value={data.email}
                                        placeholder="Your email address..."
                                        isFocused={true}
                                        handleChange={handleOnChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        forInput="password"
                                        value="Password"
                                    />
                                    <Input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        placeholder="Your password..."
                                        isFocused={true}
                                        handleChange={handleOnChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        forInput="password_confirmation"
                                        value="Password Confirmation"
                                    />
                                    <Input
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        placeholder="Your password..."
                                        isFocused={true}
                                        handleChange={handleOnChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid space-y-[14px] mt-[30px]">
                                <Button>
                                    <span className="text-base font-semibold">
                                        Sign Up
                                    </span>
                                </Button>

                                <Link href={route("login")}>
                                    <Button variant="light-outline">
                                        <span className="text-base text-white">
                                            Sign In to My Account
                                        </span>
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
