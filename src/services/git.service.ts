import axios from "axios";

export const getOwnerRepositories = (
  githubUsername: string,
  githubToken: string
) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: `https://api.github.com/users/${githubUsername}/repos`,
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
