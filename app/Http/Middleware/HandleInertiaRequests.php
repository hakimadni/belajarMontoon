<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Auth;
use Carbon\Carbon;
use Session;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */

     private function activePlan()
     {
         $activePlan = Auth::user() ? Auth::user()->lastActiveUserSub : null;
         if (!$activePlan) {
             return null;
         }
         $lastDay = Carbon::parse($activePlan->updated_at)->addMonths($activePlan->subsPlan->durationMonths);
         $activeDays = Carbon::parse($activePlan->updated_at)->diffInDays($lastDay);
         $remaingActiveDays = Carbon::parse($activePlan->expired_date)->diffInDays(Carbon::now());
         return [
             'name' => $activePlan->subsPlan->name,
             'remainingActiveDays' => $remaingActiveDays,
             'activeDays' => $activeDays,
         ];
     }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'activePlan' => $this->activePlan(),
            ],
            'flashMessage' => [
                'type' => Session::get('type'),
                'message' => Session::get('message'),
            ],
            'env' => [
                'MIDTRANS_CLIENT_KEY' => env('MIDTRANS_CLIENT_KEY'),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
