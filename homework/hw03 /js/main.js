import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "jesseray";
let password = "password";

async function initializeScreen() {
  token = await getAccessToken(rootURL, username, password);
  showNav();
  getPosts();
  getSuggestions();
  getProfile();
  getStories();
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
        <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:
/**
 * Goal: We wat to generate our posts from data.
 *      1. Go out to the internet and fetch all of our posts.
 *      2. Once our posts come back, we want to loop through each pst,
 *         and append each post to the correct place in our HTML.
 */

async function getPosts() {
  // get the HTTP response header:
  const endpoint =
    "https://photo-app-secured.herokuapp.com/api/posts/?limit=10";
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // get the HTTP body (JSON object):
  const posts = await response.json();

  // print the data to the console:
  console.log(posts);

  // invoke this function to actually draw the posts to the screen:
  showPosts(posts);
}

async function getStories() {
  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/stories/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const stories = await response.json();

  //print the data to the console
  console.log(stories);

  // invoke the function so that the screen may display it
  showStories(stories);
}

async function getProfile() {
  //go out to the internet. Get my user information, and then bring them down to my browser.
  const endpoint = "https://photo-app-secured.herokuapp.com/api/profile/";
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const userInfo = await response.json();

  console.log(userInfo);

  showProfile(userInfo);
}
async function getSuggestions() {
  // go out to the internet. Get suggestions, and then bring them down to my browser.
  const endpoint = "https://photo-app-secured.herokuapp.com/api/suggestions/";
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const suggestions = await response.json();

  // print the data to the console:
  console.log(suggestions);

  // invoke this function to actually draw the posts to the screen:
  showSuggestions(suggestions);
}

function showProfile(userinfo) {
  const userinfoEl = document.querySelector("#userinfo");
  const template = `
    <header class="flex gap-4 items-center">
    <img src="${userinfo.thumb_url}" class="rounded-full w-16" alt="User Profile Pic" />
    <h2 class="font-Comfortaa font-bold text-2xl">${userinfo.username}</h2>
     </header>
        `;
  userinfoEl.insertAdjacentHTML("beforeend", template);
}

function showStories(stories) {
  const storyinfoEl = document.querySelector("#storyinfo");
  stories.forEach((story) => {
    const template = `
    <div class="flex flex-col justify-center items-center">
    <img src="${story.user.thumb_url}" class="rounded-full border-4 w-12 border-gray-300" alt="User Story Profile Picture"/>
    <p class="text-xs text-gray-500">${story.user.username}</p>
    </div>
        `;
    storyinfoEl.insertAdjacentHTML("beforeend", template);
  });
}

function showSuggestions(suggestions) {
  // get a reference to the HTML tag where we want to add the posts:
  const suggestionsEl = document.querySelector("#suggestions");

  suggestions.forEach((suggestion) => {
    const template = `
          <section class="flex justify-between items-center mb-4 gap-2">
              <img src="${suggestion.thumb_url}" class="rounded-full" alt="Suggested User Profile Picture"/>
              <div class="w-[180px]">
                  <p class="font-bold text-sm">${suggestion.username}</p>
                  <p class="text-gray-500 text-xs">suggested for you</p>
              </div>
              <button class="text-blue-500 text-sm py-2" aria-label="Follow Button">follow</button>
          </section>
          `;
    suggestionsEl.insertAdjacentHTML("beforeend", template);
  });
}
function showPosts(posts) {
  // get a reference to the HTML tag where we want to add the posts:
  const mainEl = document.querySelector("main");

  // loop through each post and append an HTML representation of the post
  // to the DOM:
  posts.forEach((post) => {
    const template = `
        
            <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${
                  post.user.username
                }</h3>
                <button class="icon-button"aria-label="More"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="Post Picture"${
      post.alt_text
    }" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                    ${getLikeButton(post)}
                        <button aria-label="Comment"><i class="far fa-comment"></i></button>
                        <button aria-label="Share"><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                    ${getBookmarkButton(post)}
                    </div>
                </div>
                <p class="font-bold mb-3">${post.likes.length} like(s)</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${post.user.username}</strong>
                    ${post.caption} <button class="button">more</button>
                    </p>
                </div>
                ${showComments(post.comments)}
                <p class="uppercase text-gray-500 text-xs">${
                  post.display_time
                }</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment..." title="Comment Text Box">
                </div>
                <button class="text-blue-500 py-2" aria-label="Submit Comment">Post</button>
            </div>
        </section>
        `;
    mainEl.insertAdjacentHTML("beforeend", template);
  });
}

function showComments(comment) {
  if (comment.length > 1) {
    const lastComment = comment[comment.length - 1];
    return `
            <button>view all ${comment.length} comments</button>
            <p class="text-sm mb-3"><strong>${lastComment.user.username}</strong> ${lastComment.text}</p>
        `;
  }

  if (comment.length === 1) {
    return `<p>${comment[0].user.username} ${comment[0].text}<p>`;
  }

  return "";
}

function getLikeButton(post) {
  let iconClass = "far";
  if (post.current_user_like_id) {
    iconClass = "fa-solid text-red-700";
  }
  return `<button aria-label="like"><i class="${iconClass} fa-heart"></i></button>`;
}

function getBookmarkButton(post) {
  // return `<button><i class="far fa-comment"></i></button>`
  if (post.current_user_bookmark_id) {
    return `<button onclick="deleteBookmark(${post.current_user_bookmark_id})"aria-label="Bookmark"><i class="fa-solid fa-bookmark"></i></button>`;
  } else {
    return `<button onclick="createBookmark(${post.id})" aria-label=" Empty Bookmark">
        <i class="far fa-bookmark"></i>
        </button>`;
  }
}

window.createBookmark = async function (postID) {
  const postData = {
    post_id: postID,
  };

  const response = await fetch(
    "https://photo-app-secured.herokuapp.com/api/bookmarks/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    }
  );
  const data = await response.json();
  console.log(data);
};
window.deleteBookmark = async function (bookmarkId) {
  const response = await fetch(
    `https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  console.log(data);
};

// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
