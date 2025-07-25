/* Import js modules */
import { getNewsId, getStoryById } from "./assets/js/api.js";
import { showStories, showMessage } from "./assets/js/render.js";

/* Counter for used IDs */
let storiesId = [];
let currentIndex = 0;

/* 'Load more' button event */
let loadBtn = document.getElementById("load-more");
loadBtn.addEventListener("click", loadMore);

/* Show first ten stories on app start */
async function main() {
  try {
    storiesId = await getNewsId();
    let firstTen = storiesId.slice(0, 10);
    let arr = firstTen.map((id) => getStoryById(id));
    let stories = await Promise.all(arr);
    showStories(stories);
    currentIndex += firstTen.length;
  } catch (err) {
    console.error("Error when loading stories:", err);
    if (document.querySelector(".message-box")) return; //Avoid multiple error messages but keep 'load more' button
    showMessage("Sorry, we couldn't load the news. Please try again later.");
  }
}

/* Utility 'load more' button message function */
function endLoadWithMessage(message) {
  loadBtn.classList.add("hidden");
  if (!document.querySelector(".message-box")) showMessage(message);
}

/* 'Load more' button function */
async function loadMore() {
  if (!storiesId | (storiesId.length === 0)) {
    endLoadWithMessage("An error occurred while loading the news");
    return;
  }
  if (currentIndex >= storiesId.length) {
    endLoadWithMessage("All news loaded!");
    return;
  }
  try {
    let nextBatch = storiesId.slice(currentIndex, currentIndex + 10);
    let arr = nextBatch.map((id) => getStoryById(id));
    let newStories = await Promise.all(arr);
    showStories(newStories, false);
    currentIndex += nextBatch.length;
  } catch (err) {
    console.error("Error when loading stories:", err);
    endLoadWithMessage(
      "Sorry, we couldn't load the news. Please try again later."
    );
  }
}

/* Scroll to top button */
let scrollToTopBtn = document.getElementById("scroll-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

main();
