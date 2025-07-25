/* Retrive latest news */
export async function getNewsId() {
  let url = "https://hacker-news.firebaseio.com/v0/newstories.json";
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP request error: ${response.status}`);
    }
    let storiesId = await response.json();
    return storiesId;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/* Fetch news by IDs */
export async function getStoryById(id) {
  let url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP request error: ${response.status}`);
    }
    let story = await response.json();
    return story;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
