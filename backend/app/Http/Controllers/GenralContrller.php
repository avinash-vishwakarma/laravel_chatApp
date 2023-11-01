<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\UserOtherDetails;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class GenralContrller extends Controller
{
    public function getLogedInUser(){
        $authUser = Auth::user()->id;
        $authUser = User::with('details')->findOrFail($authUser);
        return response()->json($authUser);
    }

    public function updateUser(Request $request){

        if($request->query("image")){
            $request->validate([
                'image'=>"required"
            ]);
            // get user details
            $userDetails = UserOtherDetails::where("user_id",Auth::user()->id)->first();
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images/user-profile-images/'),$imageName);

            if($userDetails && File::exists(public_path('images/user-profile-images/').$userDetails->image)){
                File::delete(public_path('images/user-profile-images/').$userDetails->image);
                $userDetails->image = $imageName;
                $userDetails->save();
            }else{
                $userDetails = UserOtherDetails::create([
                    'user_id'=>Auth::user()->id,
                    'image'=>$imageName
                ]);
            }
            return response()->json($userDetails);

        }


        $request->validate([
            "name"=>"required",
            "bio"=>"required",
        ]);


        $user = Auth::user();
        $user->name = $request->name;
        $user->save();
        $user->details()->updateOrCreate([],[
            "bio"=>$request->bio
        ]);
        return response()->json(["message"=>"profile updated successfully"]);

    }
}
