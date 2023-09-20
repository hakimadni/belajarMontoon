<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Movie;

class DashboardController extends Controller
{
    function index(){
        $featured = Movie::where('featured', 1)->get();
        $all = Movie::all();
        return Inertia('User/Dashboard/Index', [
            'featured' => $featured,
            'all' => $all
        ]);
    }
}
