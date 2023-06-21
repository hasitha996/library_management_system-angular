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
        // $this->validate($request, [
        //     'book_name' => 'required',
        //     'category_id' => 'required',
        //     'nnote' => 'required',
        // ]);

        // if ($request->hasFile('upimage') && !$request->file('upimage')->isValid()) {
        //     return response()->json('"No image uploded"');
        // }

        try {
            DB::beginTransaction();
            //$imageName = $request->file( ['data']['upimage'])->hashName();
            // $imageName='ghjghg';
            //  Storage::disk('local')->put($imageName, file_get_contents($request->file(['data']['upimage'])));
            //  return response()->json($imageName);
            $books = Book::create([
                'book_name' => $request['data']['book_name'],
                'category_id' => $request['data']['category_id'],
                'author_id' => $request['data']['author_id'],
                //'image' => $imageName,          
                'note' => $request['data']['nnote']

            ]);
            DB::commit();
  
            return response(['message' => 'Books Successfully Saved.'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json($e);
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
