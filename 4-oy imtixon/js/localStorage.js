// local storagedan malumotni arr qilib olib olish
function getBookmarks(){
    const booksmarks = localStorage.getItem('bookmark')
    return booksmarks ? JSON.parse(booksmarks): []
}

// function getBooksByIds(bookmarks){
//     const books = 
// }

//local storage string qilib joylash
function setBookmarks(data){
    localStorage.setItem('bookmark', JSON.stringify(data.volumeInfo))
}
//local storagega bolmagan el qoshish
function addBookmark(book){
    const bookmarks = getBookmarks()
    if(!bookmarks.title.includes(book.volumeInfo.title)){
        console.log(bookmarks)
        setBookmarks(bookmarks)
    }
}
// local storageda bolmagan ellarni filter qilib qoldirish
function deleteBookmark(title){
    const bookmarks = getBookmarks()
    const newBookmarks = bookmarks.filter(element => element!=title)
    setBookmarks(newBookmarks)
}

// add new Book to playlist
var bookmarkBtn = document.querySelector('.bookmarkLink')

bookmarkBtn.addEventListener('click', event=> {
    // console.log()
    let clickedEl = event.target
    if(clickedEl.matches('.bookmarkLink')){
        const bookTitle = clickedEl.dataset.bookTitle
        console.log(bookTitle)
        addBookmark(bookTitle)
        renderPlaylist()
        
    }
    else if(clickedEl.matches('.more-btn')){
        const filmId = clickedEl.dataset.filmId
        modalBox.innerHTML = null
        let modalEl = getModal()
        let foundedFilm = movies.find(movie => movie.id == filmId)
        let titleModalEl = modalEl.querySelector('.film-title')
        titleModalEl.textContent = foundedFilm.title
        let yearModalEl = modalEl.querySelector('.film-year')
        yearModalEl.textContent = foundedFilm.year
        console.log(filmId)
        modalBox.appendChild(modalEl)
        
    }
})
// bookmark render
var bookmarkTemplate = document.querySelector('.bookmark-template').content
var bookmarkList = document.querySelector('.bookmark__list')
function renderPlaylist(){
    const bookmarks = getBookmarks()
    const books = getBookmarks(bookmarks)
    bookmarkList.innerHTML = null
    let bookmarkFragment = document.createDocumentFragment()

    books.forEach(element => {
        let playlistItemEl = document.importNode(bookmarkTemplate, true)        
        playlistItemEl.querySelector('.bookmarks__title').textContent = element.title
        playlistItemEl.querySelector('.bookmarks__author').textContent = element.authors
        playlistItemEl.querySelector('.delete-btn').dataset.bookTitle = element.title
        bookmarkFragment.appendChild(playlistItemEl)
    })
    bookmarkList.appendChild(bookmarkFragment)
}

bookmarkList.addEventListener('click', event =>{
    if(event.target.matches('.delete-btn')){
        console.log()
        deleteBookmark(event.target.dataset.bookTitle)
        renderPlaylist()
    }
})

renderPlaylist()