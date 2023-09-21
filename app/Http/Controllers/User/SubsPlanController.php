<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubsPlan;
use App\Models\UserSub;
use Auth;
use Str;
use Carbon\Carbon;
use Midtrans;

class SubsPlanController extends Controller
{
    public function __construct()
    {
        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = env('MIDTRANS_IS_PRODUCTION');
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = env('MIDTRANS_IS_SANITIZED');
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = env('MIDTRANS_IS_3DS');
    }

    public function index ()
    {
        return inertia('User/SubsPlan/Index', [
            'subsPlans' => SubsPlan::all(),
            'userSub' => null,

        ]);
    }

    public function userSub (Request $request, SubsPlan $subsPlan)
    {

        $data = [
            'user_id' => Auth::id(),
            'subs_plan_id' => $subsPlan->id,
            'price' => $subsPlan->price,
            'payment_status' => 'pending',

        ];

        $userSub = UserSub::create($data);

        $params = [
            'transaction_details' => [
                'order_id' => $userSub->id.'-'.Str::random(5),
                'gross_amount' => $userSub->price
            ]
        ];

        $snapToken = \Midtrans\Snap::getSnapToken($params);
        $userSub->update(['snapToken' => $snapToken]);
        // dd($userSub);
        return Inertia('User/SubsPlan/Index', [
            'userSub' => $userSub,
        ]);
    }

    public function midtransCallback(Request $request)
    {
        $notif = new Midtrans\Notification();

        $transaction_status = $notif->transaction_status;
        $fraud = $notif->fraud_status;

        $transaction_id = explode('-', $notif->order_id)[0];
        $userSub = UserSub::find($transaction_id);

        if ($transaction_status == 'capture') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'challenge'
                $userSub->payment_status = 'pending';
            }
            else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'success'
                $userSub->payment_status = 'paid';
                $userSub->expired_date = Carbon::now()->addMonths((int) $userSub->subsPlan->durationMonths);
            }
        }
        else if ($transaction_status == 'cancel') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSub->payment_status = 'failed';
            }
            else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSub->payment_status = 'failed';
            }
        }
        else if ($transaction_status == 'deny') {
            // TODO Set payment status in merchant's database to 'failure'
            $userSub->payment_status = 'failed';
        }
        else if ($transaction_status == 'settlement') {
            // TODO set payment status in merchant's database to 'Settlement'
            $userSub->payment_status = 'paid';
            $userSub->expired_date = Carbon::now()->addMonths((int) $userSub->subsPlan->durationMonths);
        }
        else if ($transaction_status == 'pending') {
            // TODO set payment status in merchant's database to 'Pending'
            $userSub->payment_status = 'pending';
        }
        else if ($transaction_status == 'expire') {
            // TODO set payment status in merchant's database to 'expire'
            $userSub->payment_status = 'failed';
        }

        $userSub->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Payment success'
        ]);
    }
}
