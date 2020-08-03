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
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  console.log({ scrollTop, scrollHeight, clientHeight });

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
		</div>
	`;
  container.appendChild(postElement);

  loading.classList.remove("show");
}
