const popupTrigger = document.getElementById('popup-trigger');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('close-popup');
const imageUploader = document.getElementById('image-uploader');
const uploadedImageContainer = document.getElementById('uploaded-image-container');
const postInput = document.getElementById('post-input');
const postButton = document.getElementById('post-button');
const postsContainer = document.querySelector('.posts');

popupTrigger.addEventListener('click', () => {
  popup.style.display = 'block';
});

closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
  uploadedImageContainer.innerHTML = '';
});

imageUploader.addEventListener('change', () => {
  const files = imageUploader.files;
  for (const file of files) {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.style.width = "523px"
    image.classList.add('uploaded-image');
    uploadedImageContainer.appendChild(image);
  }
});

let userLog = localStorage.getItem('userLog');
let postElement;
postButton.addEventListener('click', () => {
  const postContent = postInput.value;
  const imageValue = imageUploader.value;

  if (imageValue.trim() !== '') {
    postElement = document.createElement('div');
    postElement.classList.add("card");
    postElement.innerHTML = `<div>
              <div class="top">
                <div class="userDetails">
                  <div class="profilepic">
                    <div class="profile_img">
                      <div class="image">
                        <img src="images/cover 6.png" alt="img9" />
                      </div>
                    </div>
                  </div>
                  <h3>
                    
                    ${userLog}
                    <br />
                  </h3>
                </div>
                <div>
                  <span class="dot">
                    <i class="fa-solid fa-trash" onclick="deletePost(this)" ></i>
                  </span>
                </div>
              </div>
              <div class="imgBx">
                
              </div>
              <div class="bottom">
                <div class="actionBtns">
                  <div class="left">
                    <span class="heart">
                      <span>
                        <i
                          class="fa-regular fa-heart fa-xl"
                          id="like-4"
                          onclick="addLike(4)"
                        ></i>
                      </span>
                    </span>
                    <i
                      class="fa-regular fa-comment fa-flip-horizontal fa-xl"
                    ></i>

                    <i class="fa-regular fa-paper-plane fa-xl"></i>
                  </div>
                  <div class="right">
                                        <i class="fa-regular fa-bookmark fa-xl" id="save-4" onclick="savePost(4)"></i>

                  </div>
                </div>

                <!-- Adding number of like and name of people -->

                
                 <span class="likes" id="likee-4">0</span> likes
                
                  <p class="message">
                    <b>${userLog}</b>
                  </p>
                
                <p class="card-text">${postContent}</p>
                <a href="#">
                  <h6 class="comments">View all 0 comments</h6>
                </a>
                <a href="#">
                  <h5 class="postTime">Just now</h5>
                </a>
                <div class="commentsAdded" id="commentsAdded-4"></div>
                <div class="addComments">
                  <div class="reaction">
                    <h3><i class="far fa-smile"></i></h3>
                  </div>
                  <input
                    type="text"
                    class="text textComment" id="textComment-4"
                    placeholder="Add a comment..."
                  />
                  <a class="addComment" onclick="addComment(4)">Post</a>
                </div>
              </div>
            </div>`

    const uploadedImages = uploadedImageContainer.querySelectorAll('.uploaded-image');
    const imgBx = postElement.querySelector('.imgBx');
    uploadedImages.forEach(image => {
      const clonedImage = image.cloneNode();
      clonedImage.classList.add('cover');
      imgBx.appendChild(clonedImage);
    });

    postsContainer.insertBefore(postElement, postsContainer.firstChild);

    postInput.value = '';
    popup.style.display = 'none';
    uploadedImageContainer.innerHTML = '';

    const deleteButton = postElement.querySelector('.fa-ellipsis-h');
    deleteButton.addEventListener('click', () => {
      deletePost(postElement);
    });
  }
});


//delete post

function deletePost(deleteButton) {
  const postElement = deleteButton.closest('.card');
  if (postElement) {
    postElement.remove();
  }
}


///Like

let isLiked = false;
let likeID;
function addLike(num) {
  const like = document.getElementById(`like-${num}`);

  let likeText = document.getElementById(`likee-${num}`);
  let likeCount = parseInt(likeText.textContent);

  if (isLiked) {
    like.classList.remove("fa-solid");
    like.classList.add("fa-regular");
    like.style.color = "black"; // Change to default color
    likeCount--;
  } else {

    like.classList.add("fa-solid");
    like.classList.remove("fa-regular");
    like.style.color = "red";
    likeCount++;


  }
  likeText.textContent = likeCount;

  isLiked = !isLiked;
}



///add comment    ???
function addComment(idNum) {
  let commentsAdded = document.getElementById(`commentsAdded-${idNum}`);
  let textComment = document.getElementById(`textComment-${idNum}`);

  commentsAdded.innerHTML += textComment.value + "<br>";
  textComment.value = "";
}

//saved
let isSaved = false;
function savePost(num) {
  const save = document.getElementById(`save-${num}`);

  if (isSaved) {
    save.classList.remove("fa-solid");
    save.classList.add("fa-regular");
  } else {

    save.classList.add("fa-solid");
    save.classList.remove("fa-regular");
  }

  isSaved = !isSaved;
}


//log out

const logout = document.getElementById("logout")
logout.addEventListener("click", () => {
  window.location.href = "./index.html";
})
//logout in mobile
const logout2 = document.getElementById("logout2")
logout2.addEventListener("click", () => {
  window.location.href = "./index.html";
})


///delete account

function deleteAccount() {
  let userLog = localStorage.getItem('userLog');

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let storedData = localStorage.getItem(key); //2 steps store in var

    try {
      let userData = JSON.parse(storedData);// parse var
      if (userData && userData.user === userLog) {
        localStorage.removeItem(key); // Remove data associated with the key
        localStorage.removeItem('userLog'); // Remove 'userLog' key

      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
  window.location.href = "./index.html"; // Redirect after the loop is done
}



////dark mode
const dark = document.getElementById("dark");
const allElements = document.querySelectorAll("*");
const instaLogo = document.getElementById("instaLogo");

const body = document.body;
let isDarkMode = false;

dark.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    allElements.forEach(element => {
      element.style.backgroundColor = "black";
      element.style.color = "white";
      // instaLogo.src = "images/insta_white.png";
    });
  } else {
    allElements.forEach(element => {
      element.style.backgroundColor = "";
      element.style.color = ""; // Reset to default color
      // instaLogo.src = "images/logo.PNG";
    });
  }
});

////dark mode in mobile
const dark2 = document.getElementById("dark2");
const allElements2 = document.querySelectorAll("*");

let isDarkMode2 = false;

dark2.addEventListener("click", () => {
  isDarkMode2 = !isDarkMode2;
  if (isDarkMode2) {
    allElements2.forEach(element => {
      element.style.backgroundColor = "black";
      element.style.color = "white";
      // instaLogo.src = "images/insta_white.png";
    });
  } else {
    allElements2.forEach(element => {
      element.style.backgroundColor = "";
      element.style.color = ""; // Reset to default color
      // instaLogo.src = "images/logo.PNG";
    });
  }
});
