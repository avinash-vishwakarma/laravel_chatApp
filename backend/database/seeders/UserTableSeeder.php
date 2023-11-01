<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        $users = [["name"=>"Reena Vishwakarma",
        "email"=>"reenavishwakarma@test.com" , 
        'password'=>Hash::make('testpassword@')],
        ["name"=>"Ajay Vishwakarma",
        "email"=>"ajayvishwakarma@test.com" , 
        'password'=>Hash::make('testpassword@')],
        ["name"=>"yash Vishwakarma",
        "email"=>"yashvishwakarma@test.com" , 
        'password'=>Hash::make('testpassword@')],
        ["name"=>"Pratibha Sahu",
        "email"=>"pratibhasahu@test.com" , 
        'password'=>Hash::make('testpassword@')],
        ["name"=>"Avinash Vishwakarma",
        "email"=>"avinashvishwakarma@test.com" , 
        'password'=>Hash::make('testpassword@')]
    ];

    foreach ($users as $user) {
        User::create($user);
    }

    
    }
}
