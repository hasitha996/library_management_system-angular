<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = 'books';
    protected $fillable = [
        'book_name', 'category_id', 'author_id','image','note'
    ];

    public function author()   {
        
        return $this->hasOne(User::class, 'id', 'author_id');
    }
}
