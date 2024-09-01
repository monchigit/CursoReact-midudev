const getCover = async (key, array) => {
    const tryFetchCover = async (key) => {
        try {
            const coverFetch = await fetch(`https://covers.openlibrary.org/b/olid/${key}-M.jpg`);
            const imageBlob = await coverFetch.blob();
            if (imageBlob !== coverFetch && key) {
                return imageBlob;
            }
        } catch (error) {
            console.log(`Error fetching cover for ${key}:`, error);
        }
        return null;
    };

    // Intentar primero con el key principal
    let imageBlob = await tryFetchCover(key);
    if (imageBlob) return imageBlob;

    // Si falla, intentar con los otros keys en el array
    for (let arrKey of array) {
        imageBlob = await tryFetchCover(arrKey);
        if (imageBlob) return imageBlob;
    }

    throw new Error("No se pudo obtener ninguna portada");
};

export const searchBooks = async ({ search }) => {
    if (search === '') return null;

    let title = search.split(' ').join('+');

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${title}&fields=*,availability&limit=12`);
        const json = await response.json();
        const books = json.docs;

        const bookPromises = books.map(async (book) => {
            const coverBlob = await getCover(book.cover_edition_key, book.edition_key);
            const coverUrl = URL.createObjectURL(coverBlob);

            return {
                title: book.title,
                key: book.key,
                author: book.author_name[0],
                year: book.first_publish_year,
                rating: book.ratings_average,
                resume: book.first_sentence,
                editorial: book.publisher ? book.publisher[0] : null,
                cover: coverUrl,
            };
        });

        // Esperar a que todas las promesas se resuelvan
        const results = await Promise.all(bookPromises);
        return results;
    } catch (error) {
        console.error("An error has occurred:", error);
        throw new Error("An error has occurred");
    }
};
