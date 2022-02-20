var searchInputEl = document.getElementById('searchInput')
var booklistTemplate = document.querySelector('.booklist-template').content
var bookListEl = document.querySelector('.book__list')

var showResult = document.querySelector('.amount__result')
var pageCount = document.querySelector('.pageCount')
var pagelinkPrev = document.querySelector('.pagePrev')
var pagelinkNext = document.querySelector('.pageNext')
var currentPage = 1
let response;
pagelinkPrev.textContent = '<'
var startIndex = 0

// pagination
window.addEventListener('click', (event)=>{
    var pageEl = event.target
    if(pageEl.dataset.task=="paginationbtnPrev"){

        if(currentPage>1){
            currentPage-=1
            getBooks().then(()=> {
                renderBooks(bookListEl)
            })
            renderPage()
        }
    }
    if(pageEl.dataset.task=="paginationbtnNext"){
        if(currentPage<Math.ceil(response.totalItems/10)){
            currentPage+=1
            getBooks().then(()=> {
                renderBooks(bookListEl)
            })
            renderPage()
        }
        if(currentPage == 1){
            pagelinkPrev.classList.add('disabled')
        }else{
            pagelinkPrev.classList.remove('disabled')
        }
    
        if(currentPage == Math.ceil(allBooks/10)){
            pagelinkNext.classList.add('disabled')
        }else{
            pagelinkNext.classList.remove('disabled')
        }
    }


    
})


async function getBooks() {
    response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputEl.value}&startIndex=${(currentPage-1)*10}`)
    response = await response.json()
    allBooks = response.totalItems
    return response
}
var counter = 1
getBooks().then(()=> {
    renderBooks(bookListEl)
})

async function renderBooks(node){
        let booksData = response.items
        node.innerHTML = null      
        let bookListFragment = document.createDocumentFragment()
        booksData.forEach(element=>{
            let bookItemEl = document.importNode(booklistTemplate, true)
            if(element.volumeInfo.imageLinks){
                let bookImgEl = bookItemEl.querySelector('.book__img')
                // bookImgEl.setAttribute('scr', `${element.volumeInfo.imageLinks.thumbnail}`)
                bookImgEl.src= element.volumeInfo.imageLinks.thumbnail
            }else{
                let bookImgEl = bookItemEl.querySelector('.book__img')
                bookImgEl.src= `https://media.springernature.com/w306/springer-static/cover-hires/book/978-3-540-77978-0`
            }
            if(element.volumeInfo.title){
                let bookTitleEl = bookItemEl.querySelector('.book__title')
                bookTitleEl.textContent = element.volumeInfo.title
            }
            if(element.volumeInfo.authors){
                let bookAuthorEl = bookItemEl.querySelector('.book__author')
                bookAuthorEl.textContent = element.volumeInfo.authors
            }
            if(element.volumeInfo.publishedDate){
                let bookYearEl = bookItemEl.querySelector('.book__year')
                bookYearEl.textContent = element.volumeInfo.publishedDate
            }
            bookListFragment.appendChild(bookItemEl)
        })
        
        // renderPagination(perPage)
        node.appendChild(bookListFragment)
        showResult.textContent = response.totalItems
        renderPage()
}


let pageDot = document.getElementById('pagedot')



let page1 = document.querySelector('.per_page1')
let page2 = document.querySelector('.per_page2')
let page3 = document.querySelector('.per_page3')
let page4 = document.querySelector('.per_page4')
function renderPage(){
    response.totalItems
    if(currentPage == Math.ceil(allBooks/10)-5){
        pageDot.remove()
    }
    if(Math.ceil(allBooks/10) > 4){
        page1.textContent = currentPage
        page1.dataset.page = currentPage

        page2.textContent = Number(currentPage)+1
        page2.dataset.page = Number(currentPage)+1

        page3.textContent = Math.ceil(allBooks/10)-1
        page3.dataset.page = Math.ceil(allBooks/10)-1
        
        page4.textContent = Math.ceil(allBooks/10)
        page4.dataset.page = Math.ceil(allBooks/10)
    }
}


////////   BOOKMARK /////////

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
    localStorage.setItem('bookmark', JSON.stringify(data))
}
//local storagega bolmagan el qoshish
function addBookmark(book){
    const bookmarks = getBookmarks()
    if(!bookmarks.title.includes(book.title)){
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
var bookmarkBtn = document.getElementById('bookmarkLink')

console.log(bookmarkBtn);

window.addEventListener('click', event=> {    
    if(event.target.dataset.bookmark==='likeBook'){
        let clickedEl = event.target
        let closest = clickedEl.closest('li')
        var bookName = closest.querySelector('.book__title').textContent     
        var bookAthor = closest.querySelector('.book__author').textContent       
        closest.querySelector('.book__author').textContent   
        var book = {
            title:bookName, 
            authorr:bookAthor,
        }          
             
        console.log(closest)  
        console.log(book);  
        addBookmark(book)
        renderPlaylist()       
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