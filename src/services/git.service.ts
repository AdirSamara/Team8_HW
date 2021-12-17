import axios from "axios";

const enum githubUrls {
  userRepos = "https://api.github.com/users/$username/repos",
  filesRepo = "https://api.github.com/repos/$username/$repo/git/trees/master?recursive=1",
}

export const getOwnerRepositories = (
  githubUsername: string,
  githubToken: string
) => {
  return new Promise((resolve, reject) => {
    const url = githubUrls.userRepos.replace("$username", githubUsername);
    axios({
      method: "get",
      url: url,
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

export const getOwnerFilesInRepo = (
  githubUsername: string,
  githubToken: string,
  repositoryName: string
) => {
  return new Promise((resolve, reject) => {
    const url = githubUrls.filesRepo
      .replace("$username", githubUsername)
      .replace("$repo", repositoryName);
    console.log(url);
    axios({
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${githubToken}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
      },
    })
      .then((response) => {
        const files = response.data.tree;
        if (Array.isArray(files)) resolve(files.length);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
