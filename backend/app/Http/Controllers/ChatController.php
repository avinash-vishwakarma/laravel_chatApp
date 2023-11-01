<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Member;
use App\Models\Message;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // get auth user 
        $user = Auth::user();
        // get all the conversation where participant contains Auth user
        $allChatMembers = Member::where("user_id",Auth::user()->id)->pluck('conversation_id')->toArray();
        $conversations = Conversation::addSelect(['latestMessage'=>Message::select('content')->whereColumn("conversation_id","conversations.id")->latest()->take(1)])->with(['otherMember','group'])->whereIn('id',$allChatMembers)->get();
        return response()->json($conversations);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        // get members 
        $request->validate([
            "users"=>"required",
            "type"=>"required"
        ]);
        
        if($request->type == "single"){
            $nextMember = User::findOrFail($request->users);
            $checkUserIds = [Auth::user()->id , $nextMember->id];
            $conversation = Member::select('conversation_id')->whereIn('user_id',$checkUserIds)->groupBy('conversation_id')->havingRaw('COUNT(DISTINCT user_id) = ' . count($checkUserIds))->get();
            if(count($conversation)){
                return response()->json($conversation[0]);
            }
            // create a new chat 
            $newConversation = Conversation::create([
                'type'=>'single'
            ]);
            $newConversation->members()->sync([Auth::user()->id , $nextMember->id]);
            return response()->json(['conversation_id'=>$newConversation->id]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $searchValue = $request->query('search');
        // find the user according to this
        $users = User::where("name",'LIKE','%'.$searchValue)->orWhere('email','LIKE','%'.$searchValue.'%')->where('id','!=',Auth::user()->id)->get();
        return response()->json($users);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
