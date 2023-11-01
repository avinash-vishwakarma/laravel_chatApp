<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Conversation;
use Illuminate\Http\Request;
use App\Events\NewMessageEvent;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Broadcast;

class MessageController extends Controller
{
    public function messages($id){
        // find all the messages for the given chats
        $conversation = Conversation::findOrFail($id)->makeHidden(['created_at','updated_at']);
        if($conversation->type == "single"){
            $conversation->member = $conversation->otherMember()->first();
        }else{
            $conversation->members = $conversation->members()->get();
            $conversation->group = $conversation->group()->get();
        }
        // conversation details
        $messages = Conversation::findOrFail($id)->messages()->get();
        // all the mesages for the conversation
        return response()->json(["conversation"=>$conversation , "messages"=>$messages]);
    }


    public function storeMessage(Request $request , $id){

        $request->validate([
            "content"=>"required"
        ]);

        // find the chat 
        $chat = Conversation::findOrFail($id);
        // create a new message 
        $newMessage = new Message(['sender_id'=>Auth::user()->id,"content"=>$request->content]);
        $newSavedMessage  = $chat->messages()->save($newMessage);
        // broadcast the message to the channel 
        Broadcast::event(new NewMessageEvent($newSavedMessage))->toOthers();
        return response()->json($newSavedMessage);
    }
}
