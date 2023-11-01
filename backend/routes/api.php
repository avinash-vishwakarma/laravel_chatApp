<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;
use App\Http\Middleware\MessageAccessor;
use App\Http\Controllers\GenralContrller;
use App\Http\Controllers\MessageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->controller(GenralContrller::class)->group(function(){
    Route::get('/user','getLogedInUser');
    Route::post('/user','updateUser');
    
});


Route::middleware(['auth:sanctum'])->controller(ChatController::class)->group(function(){
    Route::get('/chats','index');
    Route::get('/find-user','show');
    Route::post('/create','create');
});

Route::middleware(['auth:sanctum'])->controller(MessageController::class)->group(function () {
    Route::middleware('can:access_messages')->get('/messages/{id}','messages');
    Route::middleware('can:access_messages')->post('/messages/{id}','storeMessage');
});

