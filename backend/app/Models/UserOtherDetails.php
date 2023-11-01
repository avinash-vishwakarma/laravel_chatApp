<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserOtherDetails extends Model
{
    use HasFactory;

    protected $fillable = ["bio",'image','user_id'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
