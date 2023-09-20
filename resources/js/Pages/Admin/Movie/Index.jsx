import Authenticated from "@/Layouts/Authenticated/Index";
import Button from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index({ auth, flashMessage, movies }) {
    const { delete: destroy, put } = useForm();
    return (
        <Authenticated auth={auth}>
            <Head title="Movie List" />
            <Link href={route("admin.movie.create")}>
                <Button type="button" className="w-40 mb-5">
                    Insert Movie
                </Button>
            </Link>
            {flashMessage?.message && (
                <FlashMessage message={flashMessage.message} />
            )}
            <table className="table-fixed w-full text-center">
                <thead>
                    <tr>
                        <th className="w-1/12">Poster</th>
                        <th className="w-1/12">Title</th>
                        <th className="w-1/12">Category</th>
                        <th className="w-1/12">Rating</th>
                        <th className="w-1/12" colSpan={2}>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>
                                <img
                                    src={`/storage/${movie.poster}`}
                                    alt={movie.title}
                                    className="w-100 rounded-md"
                                />
                            </td>
                            <td>{movie.name}</td>
                            <td>{movie.category}</td>
                            <td>{movie.rating.toFixed(1)}</td>
                            <td>
                                <Link
                                    href={route("admin.movie.edit", movie.id)}
                                >
                                    <Button type="button" variant="warning">
                                        Edit
                                    </Button>
                                </Link>
                            </td>
                            <td>
                                <div
                                    onClick={() =>{
                                        movie.deleted_at ? put(
                                            route(
                                                "admin.movie.restore",
                                                movie.id
                                            )
                                        ) :
                                        destroy(
                                            route(
                                                "admin.movie.destroy",
                                                movie.id
                                            )
                                        )
                                    }}
                                >
                                    <Button type="button" variant="danger">
                                        {movie.deleted_at
                                            ? "Restore"
                                            : "Delete"}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Authenticated>
    );
}
