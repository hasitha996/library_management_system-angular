<?php

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return Auth::user();
});



Route::group(['namespace'=>'Api\Auth'], function(){
    Route::post('/login', 'AuthenticationController@login');
    Route::post('/logout', 'AuthenticationController@logout')->middleware('auth:api');
    Route::post('/register', 'RegisterController@register');
    Route::post('/forgot', 'ForgotPasswordController@forgot');
    Route::post('/reset', 'ForgotPasswordController@reset');
    Route::get('/users_det', 'AuthenticationController@loadDet')->middleware('auth:api');
   
});

Route::post('/save_book', 'BooksController@save')->middleware('auth:api');
Route::get('fetch_books', 'BooksController@loadData');

