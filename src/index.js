document.addEventListener('DOMContentLoaded', function() {

  const imageId = 17 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  fetch('https://randopic.herokuapp.com/images/17')
  .then(response => response.json())
  .then(response => showPic(response))


function showPic(picObj){
  const container = document.getElementById('image_card')
    const img = document.getElementById('image')
    img.src = picObj.url
    const name = document.getElementById('name')
    name.innerText = picObj.name
    const likes = document.getElementById('likes')
    likes.innerText = picObj.like_count
    const likeBttn = document.getElementById('like_button')
    const commentText = document.getElementById('comments')
    commentText.innerText = picObj.comments.content
    likeBttn.addEventListener('click', () => {
      const likeValue = {
          like_count: ++picObj.like_count
        }
        const imageValue = {
          image_id:picObj.id
        }
        updateLikes(picObj.id,likeValue,imageValue)
        likes.innerText = picObj.like_count
    })

    const submitBttn = document.getElementById('submit-button')
    const comment = document.getElementById('comment_input')

    submitBttn.addEventListener('click', () =>{
      let commentObj = {
        image_id: picObj.id,
        content: comment.value
      }
      newComments(commentObj)
      commentText.innerText = comment.value

    })

  }

  function updateLikes(id, likeValue,imageValue){
    console.log(imageValue)
    return fetch(`https://randopic.herokuapp.com/likes`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(imageValue), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
    }

  function newComments(comments){
    return fetch('https://randopic.herokuapp.com/comments', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(comments), // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses response to JSON
  }


})
