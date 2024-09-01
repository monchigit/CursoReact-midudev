/* eslint-disable react/prop-types */


export function BooksList ({ books }) {
    return (
        <ul className="home-main__books">
            {
            books?.map(book=> (
                <li key={book.key}
                className="home-main__books-book">
                    <h3 className="home-main__books-book-h3" >{book.title}</h3>
                    <img src={book.cover} alt={book.title} className="home-main__books-book-img"/>
                    <p className="home-main__books-book-p">{book.author} {book.year}</p>
                </li>
            ))
            }
        </ul>
    )
}

export function Books ({ books, isFirstSubmit }) {
    return (
        books.length > 0
        ? <BooksList books={books}/>
        : (!isFirstSubmit && <h2 className="home-main__no-results">No results for this search</h2>)
    )
}