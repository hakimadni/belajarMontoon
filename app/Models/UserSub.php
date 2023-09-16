<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserSub extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'subs_plan_id',
        'price',
        'expired_date',
        'payment_status',
        'snapToken',
    ];

    /**
     * Get the user that owns the UserSubs
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function subsPlan()
    {
        return $this->belongsTo(SubsPlan::class);
    }
}
