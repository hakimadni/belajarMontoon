<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Movie\Store;
use App\Http\Requests\Admin\Movie\Update;
use Storage;
use Str;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $movies = Movie::all();
        return Inertia('Admin/Movie/Index', [
            'movies' => $movies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia('Admin/Movie/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Store $request)
    {
        $data = $request->validated();
        $data['poster'] = Storage::disk('public')->put('movies', $request->file('poster'));
        $data['slug'] = Str::slug($data['name']);
        $movie = Movie::create($data);
        return redirect(route('admin.movie.index'))->with([
            'type' => 'success',
            'message' => 'Movie inserted successfully'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function show(Movie $movie)
    {
        return $movie;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function edit(Movie $movie)
    {
        return Inertia('Admin/Movie/Edit', [
            'movie' => $movie,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function update(Update $request, Movie $movie)
    {
        $data = $request->validated();
        if ($request->hasFile('poster')) {
            Storage::disk('public')->delete($movie->poster);
            $data['poster'] = Storage::disk('public')->put('movies', $request->file('poster'));
        }else{
            $data['poster'] = $movie->poster;
        };
        $movie->update($data);
        return redirect(route('admin.movie.index'))->with([
            'type' => 'success',
            'message' => 'Movie updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie)
    {
        //
    }
}
