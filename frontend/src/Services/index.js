import axios from "axios";

axios.defaults.baseURL = "backendURLHERE";
axios.defaults.headers.common["Authorization"] = "Bearer yourAccessToken"; // user Auth token here

// Example to Make a GET request
axios
  .get("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// Example to Make a POST request
const postData = {
  title: "foo",
  body: "bar",
  userId: 1,
};

axios
  .post("https://jsonplaceholder.typicode.com/posts", postData)
  .then((response) => {
    console.log("Post successful:", response.data);
  })
  .catch((error) => {
    console.error("Error posting data:", error);
  });
