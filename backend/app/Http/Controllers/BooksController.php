<?php

namespace App\Http\Controllers;

use App\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BooksController extends Controller
{
    public function save(Request $request)
    {
    

        if ($request->hasFile('image'))
        {
            
              $file      = $request->file('image');
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              //move image to public/img folder
              $file->move(public_path('img'), $picture);

              $books = Book::create([
                'book_name' => $request->book_name,
                'category_id' => $request->category_id,
                'author_id' => $request->author_id,
                'image' => $picture,          
                'note' => $request->note

            ]);
            
  
            return response(['message' => 'Books Successfully Saved.'], 200);
        } 
        else
        {
              return response()->json(["message" => "Select image first."]);
        }
     
    }

    public function loadData()
    {
        try {

            $books=Book::with('author')->get();

            return response()->json($books,200);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }
}
