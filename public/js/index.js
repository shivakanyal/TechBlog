// function saveData(tlikes,tdislikes,articleId,boolean){
//     fetch('http://localhost:3000/saveLikes',{
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             likes:tlikes,
//             dislikes:tdislikes,
//             articleId:articleId,
//             boolean:boolean
//         })
//     }).then(response => {
//         return response.json() 
//     })
//     .then(result => console.log('result:', result))
//     .catch(err =>{
//         console.log(err)
//     })
// }

// var articleMap = new Map()
// var dislikesMap = new Map()
// fetch('http://localhost:3000/initializedMaps')
//     .then(res => res.json())
//         .then(result =>{
//             console.log(result);
//             for(var i=0;i<result.length;i++){
//                 articleMap[result[i]._id] = 0;
//                 dislikesMap[result[i]._id+'d']=0;
//             }      
// })

// function toggleLike(e){

//     e.target.classList.toggle('active');

//     if(e.target.classList.contains('active')){
//        articleMap[e.target.dataset.likesid]++;
//     }
//     else{
//         articleMap[e.target.dataset.likesid]--;
//     }
//     if(e.target.nextElementSibling.classList.contains('active')){
//         e.target.nextElementSibling.classList.remove('active');
//         dislikesMap[e.target.nextElementSibling.dataset.dislikesid]--;
//     }
//     e.target.parentNode.childNodes[5].childNodes[1].textContent = articleMap[e.target.dataset.likesid]+' likes'
//     e.target.parentNode.childNodes[5].childNodes[3].textContent = dislikesMap[e.target.nextElementSibling.dataset.dislikesid]+' dislikes'
//     saveData(articleMap[e.target.dataset.likesid].toString(),  dislikesMap[e.target.nextElementSibling.dataset.dislikesid].toString(),e.target.dataset.likesid,e.target.classList.contains('active'));
// }

// function toggleDislike(e){
//     e.target.classList.toggle('active');
//     if(e.target.classList.contains('active')){
//         dislikesMap[e.target.dataset.dislikesid]++;
//     }
//     else{
//         dislikesMap[e.target.dataset.dislikesid]--;
//     }
//     if(e.target.previousElementSibling.classList.contains('active')){
//         e.target.previousElementSibling.classList.remove('active');
//         articleMap[e.target.previousElementSibling.dataset.likesid]--;
//     }
//     e.target.parentNode.childNodes[5].childNodes[3].textContent = dislikesMap[e.target.dataset.dislikesid]+' dislikes'
//     e.target.parentNode.childNodes[5].childNodes[1].textContent = articleMap[e.target.previousElementSibling.dataset.likesid]+' likes'
  
//     saveData(articleMap[e.target.previousElementSibling.dataset.likesid].toString(),dislikesMap[e.target.dataset.dislikesid].toString(),e.target.previousElementSibling.dataset.likesid,e.target.classList.contains('active'));

// }


// console.log('client side js is running')
// const likeBtn = document.querySelectorAll('.like-button')
// const dislikeBtn = document.querySelectorAll('.dislike-button')

// const likes = document.querySelector('#likes')
// const dislikes = document.querySelector('#dislike')

// likeBtn.forEach((like) =>{
//         like.addEventListener('click',toggleLike)
// })
// dislikeBtn.forEach((dislike) =>{
//         dislike.addEventListener('click',toggleDislike)
// })

