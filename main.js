const container = document.getElementById("container");
const loading = document.querySelector(".loading");

//First paint immediately Dom is loaded
window.addEventListener("DOMContentLoaded", () => {
  getPost();
  getPost();
  getPost();
});

// To get a random post by creating  a random number
function getRandomNr() {
  return Math.floor(Math.random() * 100) + 1;
}

//Fetch post from the JPH Api
async function getPost() {
  const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${getRandomNr()}`);
  const postData = await postResponse.json();

  const userResponse = await fetch("https://randomuser.me/api");
  const userData = await userResponse.json();

  const data = { post: postData, user: userData.results[0] };

  addDataToDOM(data);
}

//Perform the infinite Scroll
window.addEventListener("scroll", () => {
  //  On the right of your screen, when you scroll down, there is a scroll bar,
  //  The invisible column where the scroll bar is On, will be called scroll section
  //  scrollTop =  the distance between the top of the scroll bar, and the top of the window
  //  scrollHeight = The overall height of the scroll section
  //  clientHeight = The height of your device page.
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  //We are adding 5 to the left hand side of the equation(I knw! removing 5 on the right,
  //   is just like adding 5 to the left), this is because the scrolltop is hardly a whole
  // number, always decimal, so we need to add some px to it to make it whole
  if (clientHeight + scrollTop >= scrollHeight - 5) {
    // show the loading animation
    showLoading();
  }
});

//Show loading when making a server request
function showLoading() {
  loading.classList.add("show");

  // load more data
  setTimeout(getPost, 1000);
}

//Display post generated to DOM
function addDataToDOM(data) {
  const postElement = document.createElement("div");
  postElement.classList.add("blog-post");
  postElement.innerHTML = `
		<h2>${data.post.title}</h2>
		<p>${data.post.body}</p>
		<div class="user-info">
			<img src="${data.user.picture.large}" alt="${data.user.name.first}" />
            <span>${data.user.name.first} ${data.user.name.last}</span>
            <span>${data.user.email} </span>

		</div>
	`;
  container.appendChild(postElement);

  loading.classList.remove("show");
}
