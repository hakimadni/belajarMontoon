<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubsPlan;
use App\Models\UserSub;
use Auth;
use Carbon\Carbon;

class SubsPlanController extends Controller
{
    public function index ()
    {
        return inertia('User/SubsPlan/Index', [
            'subsPlans' => SubsPlan::all()
        ]);
    }

    public function userSub (Request $request, SubsPlan $subsPlan)
    {
        // protected $fillable = [
        //     'user_id',
        //     'subs_plan_id',
        //     'price',
        //     'expired_date',
        //     'payment_status',
        //     'snapToken',
        // ];
        $data = [
            'user_id' => Auth::id(),
            'subs_plan_id' => $subsPlan->id,
            'price' => $subsPlan->price,
            'expired_date' => Carbon::now()->addMonths($subsPlan->durationMonths),
            'payment_status' => 'success',

        ];

        UserSub::create($data);
        return redirect(route('user.dashboard.index'));
    }
}
