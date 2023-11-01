<?php

namespace App\Broadcasting;

use App\Models\User;
use App\Models\Member;
use App\Models\Conversation;

class ConversationChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\Models\User  $user
     * @return array|bool
     */
    public function join(User $user , int $conversation_id)
    {
        return Member::where("conversation_id","=",$conversation_id)->where("user_id","=",$user->id)->exists();
    }
}
