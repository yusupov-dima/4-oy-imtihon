var sortByDateBtn = document.querySelector('.sortByDate')
sortByDateBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    async function getBooks2() {
        response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInputEl.value}&startIndex=${currentPage}&orderBy=newest`)
        response = await response.json()
        return response
    }
    getBooks2().then(()=>{
        try {
            renderBooks(bookListEl)
        } catch (error) {
            console.log(error.message);
        }
    })

})

