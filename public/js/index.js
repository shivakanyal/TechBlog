const readMoreBtn = document.querySelector('.read-more')
const articleFull = document.querySelector('.article-full')
const articleLess = document.querySelector('.article-less')
const articleContainer = document.querySelectorAll('.article-container');

console.log(articleContainer);

const articleContainerarray = [...articleContainer];
const articleDescription = document.querySelector('.article-description');

articleContainerarray.forEach((container)=>{
    container.addEventListener('click',readLessMore);
})


function readLessMore(e){
    console.log(e.target)
    if(e.target.classList.contains('read-more')){

    if(e.target.textContent=='Read More'){
        e.target.textContent = 'Read Less'
        e.target.previousElementSibling.textContent = e.target.dataset.article;
    }else{
        e.target.textContent = 'Read More'
        articleDescription.textContent = articleLess.value; 
        e.target.previousElementSibling.textContent = e.target.dataset.article.substr(0,200)+'...';
        
    }
    }
}