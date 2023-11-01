<?php

namespace App\Models;

use App\Models\User;
use App\Models\Group;
use App\Models\Member;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable = ['type'];

    public function members(){
        return $this->belongsToMany(User::class,'members','conversation_id','user_id');
    }

    public function group(){
        return $this->hasOne(Group::class);
    }

    public function messages(){
        return $this->hasMany(Message::class);
    }

    public function otherMember(){
        return $this->belongsToMany(User::class,'members','conversation_id','user_id')->with(['details:user_id,image'])->select(['users.id','users.name'])->where("user_id","!=",Auth::user()->id);
    }

    public function latestMessage(){
        return $this->hasMany(Message::class)->latest();
    }


}
