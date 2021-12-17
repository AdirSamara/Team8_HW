import axios from "axios";

//all github urls api in order to fetch data
const enum githubUrls {
  userRepos = "https://api.github.com/users/$username/repos",
  filesRepo = "https://api.github.com/repos/$username/$repo/git/trees/master?recursive=1",
  activeWebhooksRepo = "https://api.github.com/repos/$username/$repo/hooks",
  specificFileRepo = "https://api.github.com/repos/$username/$repo/contents/$path",
}

/**
 *
 * @param url url of github for fetching data
 * @param githubToken "developer token" from github
 * @returns promise that holds the data
 */
const promiseGithubApi = (url: string, githubToken: string) => {
  return new Promise((resolve, reject) => {
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

export const getOwnerRepositories = (
  githubUsername: string,
  githubToken: string
) => {
  const url = githubUrls.userRepos.replace("$username", githubUsername);
  return promiseGithubApi(url, githubToken);
};

export const getOwnerFilesInRepo = (
  githubUsername: string,
  githubToken: string,
  repositoryName: string
) => {
  const url = githubUrls.filesRepo
    .replace("$username", githubUsername)
    .replace("$repo", repositoryName);
  return promiseGithubApi(url, githubToken);
};

export const getOwnerActiveWebhooksInRepo = (
  githubUsername: string,
  githubToken: string,
  repositoryName: string
) => {
  const url = githubUrls.activeWebhooksRepo
    .replace("$username", githubUsername)
    .replace("$repo", repositoryName);

  return promiseGithubApi(url, githubToken);
};

export const getOwnerYmlContentInRepo = (
  githubUsername: string,
  githubToken: string,
  repositoryName: string,
  filePath: string
) => {
  const url = githubUrls.specificFileRepo
    .replace("$username", githubUsername)
    .replace("$repo", repositoryName)
    .replace("$path", filePath);
  return promiseGithubApi(url, githubToken);
};
