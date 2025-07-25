/* News container variable */
let newsContainer = document.getElementById("news-container");

/* Render story function */
export function showStories(arr, clear = true) {
  if (clear) {
    newsContainer.innerHTML = "";
  }
  arr.forEach((story) => {
    //create news box
    let newsItem = document.createElement("div");
    newsItem.classList.add("news-item");
    newsContainer.append(newsItem);
    //create title
    let newsTitle = document.createElement("h3");
    newsTitle.classList.add("news-title");
    newsTitle.textContent = story.title;
    newsItem.append(newsTitle);
    //create link
    let link = document.createElement("a");
    link.classList.add("news-link");
    link.textContent = "read more";
    link.href = story.url;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    newsItem.append(link);
    //create date
    let date = new Date(story.time * 1000);
    let storyDate = document.createElement("span");
    storyDate.classList.add("news-date");
    storyDate.textContent = date.toLocaleDateString();
    newsItem.append(storyDate);
  });
}

/* Render 'all news loaded' message */
export function showMessage(messageText) {
  let messageBox = document.createElement("div");
  messageBox.classList.add("message-box");
  messageBox.textContent = messageText;
  newsContainer.after(messageBox);
}
