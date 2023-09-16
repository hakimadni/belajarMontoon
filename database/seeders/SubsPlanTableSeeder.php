<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SubsPlan;

class SubsPlanTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subsPlan = [
            [
                'name' => 'Basic',
                'price' => 299000,
                'durationMonths' => 3,
                'features' => json_encode([
                    'HD Available',
                    'Watch on any Device',
                    'Cancel Anytime',
                ]),
            ],
            [
                'name' => 'Premium',
                'price' => 899000,
                'durationMonths' => 1,
                'features' => json_encode([
                    'HD Available',
                    'Watch on any Device',
                    'Cancel Anytime',
                    'Box Office Movies',
                    'Unlimited Access',
                ]),
            ],
        ];

        SubsPlan::insert($subsPlan);
    }
}
