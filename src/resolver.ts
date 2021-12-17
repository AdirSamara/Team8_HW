import { getOwnerRepositories } from "./services/git.service";
import { Details } from "./types/Details";
import { Repository } from "./types/Repository";
import {
  extractGithubRepositoriesDetails,
  extractGithubRepositoriesList,
} from "./utils/git";

export const reposList = function (
  githubUsername: string,
  githubToken: string
) {
  console.log("reposList");
  getOwnerRepositories(githubUsername, githubToken)
    .then((data) => {
      const repositories: Repository[] = extractGithubRepositoriesList(data);
      console.log(repositories);
      return repositories;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const reposDetails = function (
  githubUsername: string,
  githubToken: string
) {
  console.log("repo details");
  getOwnerRepositories(githubUsername, githubToken)
    .then((data) => {
      const repositories: Details[] = extractGithubRepositoriesDetails(data);
      console.log(repositories);

      return repositories;
    })
    .catch((err) => {
      console.error(err);
    });
};
