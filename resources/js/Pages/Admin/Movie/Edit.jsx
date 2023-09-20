import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/PrimaryButton";
import { Link, Head, useForm } from "@inertiajs/react";
import Label from "@/Components/InputLabel";
import Input from "@/Components/TextInput";
import ValidationErrors from "@/Components/ValidationErrors";
import Checkbox from "@/Components/Checkbox";
import { Inertia } from "@inertiajs/inertia";

export default function Edit({ auth, movie }) {
    const { data, setData, processing, errors } = useForm({
        ...movie,
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

        if (data.poster === movie.poster) {
            delete data.poster;
        }

        Inertia.post(route("admin.movie.update", movie.id), {
            _method: "PUT",
            ...data
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Update Movie" />
            <Link href={route("admin.movie.index")}>
                <Button type="button" variant="warning" className="w-40 mb-5">
                    Back
                </Button>
            </Link>

            <h1 className="text-xl">Edit Movie</h1>
            <hr className="mb-4" />
            <ValidationErrors errors={errors} />
            <form className="w-[800px]" onSubmit={submit}>
                <div className="flex flex-col gap-6">
                    <div>
                        <Label forInput="name" value="Movie Name" />
                        <Input
                            name="name"
                            defaultValue={movie.name}
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
                            defaultValue={movie.category}
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
                            defaultValue={movie.video_url}
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
                            defaultValue={movie.rating}
                            variant="primary-outline"
                            placeholder="Enter Movie Rating"
                            handleChange={handleOnChange}
                            isError={errors.rating}
                            required
                        />
                    </div>
                    <div>
                        <Label forInput="poster" value="Movie Poster" />
                        <img
                            src={`/storage/${movie.poster}`}
                            alt={movie.title}
                            className="w-1000 rounded-md"
                        />
                        <Input
                            type="file"
                            name="poster"
                            variant="primary-outline"
                            placeholder="Choose Movie Poster"
                            handleChange={handleOnChange}
                            isError={errors.poster}
                        />
                    </div>
                    <div>
                        <Label forInput="featured" value="Featured?" />
                        <Checkbox
                            name="featured"
                            checked={movie.featured}
                            handleChange={(e) =>
                                setData("featured", e.target.checked)
                            }
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
                            Update Movie
                        </span>
                    </Button>
                </div>
            </form>
        </Authenticated>
    );
}
