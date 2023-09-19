import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/PrimaryButton";
import { Link, Head, useForm } from "@inertiajs/react";
import Label from "@/Components/InputLabel";
import Input from "@/Components/TextInput";
import ValidationErrors from "@/Components/ValidationErrors";
import Checkbox from "@/Components/Checkbox";

export default function Index({ auth }) {
    const { setData, post, processing, errors } = useForm({
        name: "",
        category: "",
        video_url: "",
        description: "",
        poster: "",
        rating: "",
        featured: 0,
    });

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("admin.movie.store"));
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Create Movie" />
            <Link href={route("admin.movie.index")}>
                <Button type="button" variant="warning" className="w-40 mb-5">
                    Back
                </Button>
            </Link>

            <h1 className="text-xl">Insert New Movie</h1>
            <hr className="mb-4" />
            <ValidationErrors errors={errors} />
            <form className="w-[370px]" onSubmit={submit}>
                <div className="flex flex-col gap-6">
                    <div>
                        <Label forInput="name" value="Movie Name" />
                        <Input
                            name="name"
                            variant="primary-outline"
                            placeholder="Enter movie name"
                            handleChange={handleOnChange}
                            isError={errors.name}
                            required
                        />
                    </div>
                    <div>
                        <Label forInput="category" value="Category" />
                        <Input
                            name="category"
                            variant="primary-outline"
                            placeholder="Enter Movie Category"
                            handleChange={handleOnChange}
                            isError={errors.category}
                            required
                        />
                    </div>
                    <div>
                        <Label forInput="video_url" value="Video URL" />
                        <Input
                            name="video_url"
                            variant="primary-outline"
                            placeholder="Enter Video URL"
                            handleChange={handleOnChange}
                            isError={errors.video_url}
                            required
                        />
                    </div>
                    <div>
                        <Label forInput="rating" value="Rating" />
                        <Input
                            type="number"
                            name="rating"
                            variant="primary-outline"
                            placeholder="Enter Movie Rating"
                            handleChange={handleOnChange}
                            isError={errors.rating}
                            required
                        />
                    </div>
                    <div>
                        <Label forInput="poster" value="Movie Poster" />
                        <Input
                            type="file"
                            name="poster"
                            variant="primary-outline"
                            placeholder="Choose Movie Poster"
                            handleChange={handleOnChange}
                            isError={errors.poster}
                            required
                        />
                    </div>
                    <div>
                        <Label forInput="featured" value="Featured?" />
                        <Checkbox
                            name="featured"
                            handleChange={(e) => setData("featured", e.target.checked)}
                        />
                    </div>
                </div>
                <div className="grid space-y-[14px] mt-[30px]">
                    <Button
                        type="submit"
                        variant="primary"
                        processing={processing}
                    >
                        <span className="text-base font-semibold">
                            Insert New Movie
                        </span>
                    </Button>
                </div>
            </form>
        </Authenticated>
    );
}
