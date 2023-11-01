<?php

namespace App\Models;

use App\Models\User;
use App\Models\Conversation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Member extends Model
{
    use HasFactory;
    
    public function conversations(){
        return $this->belongsTo(Conversation::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
