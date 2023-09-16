<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\MovieController;
use App\Http\Controllers\User\SubsPlanController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::redirect('/', '/login');

Route::middleware(['auth', 'role:user'])->prefix('dashboard')->name('user.dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');

    Route::get('subsplan', [SubsPlanController::class, 'index'])->name('subsplan')->middleware('checkUserSubs:false');
    Route::post('subsplan/{subsPlan}/userSub', [SubsPlanController::class, 'userSub'])->name('subsplan.userSub')->middleware('checkUserSubs:false');

    Route::get('movie/{movie:slug}', [MovieController::class, 'show'])->name('movie.show')->middleware('checkUserSubs:true');
});

Route::prefix('prototype')->name('prototype.')->group(function(){
    route::get('/login', function (){
        return Inertia::render('Prototype/Login');
    })->name('login');
    route::get('/register', function (){
        return Inertia::render('Prototype/Register');
    })->name('register');
    route::get('/dashboard', function (){
        return Inertia::render('User/Dashboard/Index');
    })->name('dashboard');
    route::get('/subsPlan', function (){
        return Inertia::render('Prototype/SubsPlan');
    })->name('subsPlan');
    route::get('/movie/{slug}', function (){
        return Inertia::render('Prototype/Movie/Show');
    })->name('movie.show');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
