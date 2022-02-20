window.addEventListener('click', event=>{
    let elem = event.target
    if(elem.dataset.search === 'search'){
        bookListEl.innerHTML = ''

        getBooks().then(()=>{
            try {
                renderBooks(bookListEl)
            } catch (error) {
                console.log(error.message);
            }
        })
    }
})
searchInputEl.addEventListener('keyup', ()=> {
    bookListEl.innerHTML = ''
        getBooks().then(()=>{
            try {
                renderBooks(bookListEl)
            } catch (error) {
                console.log(error.message);
            }
        })
})
