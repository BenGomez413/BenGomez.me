window.addEventListener('load', createLocalPosts());
function createLocalPosts(){
  let posts = Object.keys(localStorage);

  for(let i = 0; i < Object.keys(localStorage).length; i++){
    let post = JSON.parse(localStorage.getItem(posts[i]));
    createPost(post.id, post.name, post.imgAddress, post.comment, post.likes, post.hates);
  }
}

function newPost() {
  $('#new-post-container').css('display', 'block');
}

function storeLocally(){
  let name = $('#name-input').val();
  let id = name.replace(/[\s,-.]+/g, '');
  let imgAddress = $('#image-address-input').val();
  let comment = $('#comment-textarea').val();

  let post = {
    name: name.trim(),
    id: id,
    imgAddress:imgAddress ,
    comment: comment,
    likes: 0,
    hates: 0
  }

  window.localStorage.setItem(id, JSON.stringify(post));


  $('#name-input').val('')
  $('#image-address-input').val('');
  $('#comment-textarea').val('');

  $('#new-post-container').css('display', 'none');

  createPost(id, name, imgAddress, comment, 0, 0);
}




function createPost(id, name, imgAddress, comment, likes, hates) {
  $('#post-container').prepend(`
    <div class="post" id="${id}">
      <div class="info">
        <img src="${imgAddress}" alt="${name}">
        <br>
        <div class="likes-hates">
          <p class="tracker num-likes" id="${id}-likes">${likes} Woo!</p>
          &nbsp;
          <p class="tracker num-hates" id="${id}-hates">${hates} Boo!</p>
        </div>
      </div>

      <div class="comments">
        <h1>${name}</h1>
        <p>${comment}</p>
        <br>

        <button class='btn like-btn' id="like-btn" onclick="adjustTracker('${id}-likes')">
          <svg class='icon like-ghost' viewBox="0 0 85 113" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M42.0338 0C18.8378 0 0.033802 18.804 0.033802 42V99.5C-0.132865 101.333 0.233802 105 3.0338 105C4.8545 105 7.35173 103.106 9.46969 101.499C11.4232 100.017 13.054 98.7803 13.5338 99.5C14.3671 99.1667 17.1338 100 21.5338 106C25.9338 112 27.3671 112.5 27.5338 112C28.5338 112.167 31.3338 111.2 34.5338 106C37.7338 100.8 40.8671 99.5 42.0338 99.5C43.2005 99.5 46.3338 100.8 49.5338 106C52.7338 111.2 55.5338 112.167 56.5338 112C56.7004 112.5 58.1338 112 62.5338 106C66.9338 100 69.7004 99.1667 70.5338 99.5C71.0136 98.7803 72.6444 100.017 74.5979 101.499C76.7159 103.106 79.2131 105 81.0338 105C83.8338 105 84.2005 101.333 84.0338 99.5V42C84.0338 18.804 65.2298 0 42.0338 0ZM23.0338 42C23.0338 46.4183 19.4521 50 15.0338 50C10.6155 50 7.03381 46.4183 7.03381 42C7.03381 37.5817 10.6155 34 15.0338 34C19.4521 34 23.0338 37.5817 23.0338 42ZM77.0338 42C77.0338 46.4183 73.4521 50 69.0338 50C64.6155 50 61.0338 46.4183 61.0338 42C61.0338 37.5817 64.6155 34 69.0338 34C73.4521 34 77.0338 37.5817 77.0338 42ZM58.0338 44H26.0338V52.5161C26.0338 59.9631 33.1972 66 42.0338 66C50.8704 66 58.0338 59.9631 58.0338 52.5161V44Z" />
          </svg>
          <span>WOOOO!</span>
        </button>

        <button class='btn hate-btn' id="hate-btn" onclick="adjustTracker('${id}-hates')">
          <svg class='icon hate-ghost' viewBox="0 0 85 113" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M42.0338 0C18.8378 0 0.033802 18.804 0.033802 42V99.5C-0.132865 101.333 0.233802 105 3.0338 105C4.8545 105 7.35173 103.106 9.46969 101.499C11.4232 100.017 13.054 98.7803 13.5338 99.5C14.3671 99.1667 17.1338 100 21.5338 106C25.9338 112 27.3671 112.5 27.5338 112C28.5338 112.167 31.3338 111.2 34.5338 106C37.7338 100.8 40.8671 99.5 42.0338 99.5C43.2005 99.5 46.3338 100.8 49.5338 106C52.7338 111.2 55.5338 112.167 56.5338 112C56.7004 112.5 58.1338 112 62.5338 106C66.9338 100 69.7004 99.1667 70.5338 99.5C71.0136 98.7803 72.6444 100.017 74.5979 101.499C76.7159 103.106 79.2131 105 81.0338 105C83.8338 105 84.2005 101.333 84.0338 99.5V42C84.0338 18.804 65.2298 0 42.0338 0ZM9.35534 36.3648C7.92034 37.8108 7.03381 39.8019 7.03381 42C7.03381 46.4183 10.6155 50 15.0338 50C19.4521 50 23.0338 46.4183 23.0338 42C23.0338 41.0142 22.8555 40.07 22.5294 39.198L9.35534 36.3648ZM26.0338 71V50.6842C26.0338 46.4403 33.1972 43 42.0338 43C50.8704 43 58.0338 46.4403 58.0338 50.6842V71H26.0338ZM61.0338 42C61.0338 41.1013 61.182 40.2372 61.4553 39.4309L74.8838 36.543C76.2176 37.9723 77.0338 39.8908 77.0338 42C77.0338 46.4183 73.4521 50 69.0338 50C64.6155 50 61.0338 46.4183 61.0338 42Z" />
          </svg>
          <span>BOOOO!</span>
       </button>
      </div>
    </div>`
  );
}

function emptyPosts() {
  $('#post-container').empty();
}


function adjustTracker(id){
  let split= id.split('-');

  let key = split[0]
  let value = split[1];
  let post = JSON.parse(localStorage.getItem(key));

  let count = document.getElementById(id);

  if(value === 'likes'){
    console.log(post.likes);
    post.likes++
    count.innerHTML = `${post.likes} Woo!`;
  } else if(value === 'hates'){
    post.hates++
    count.innerHTML = `${post.hates} Boo!`;
  } else {
    console.log(`Error Bad Value: ${value}`);
  }

  localStorage.setItem(key, JSON.stringify(post));
}


