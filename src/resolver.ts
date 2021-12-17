import {
  getOwnerFilesInRepo,
  getOwnerRepositories,
} from "./services/git.service";
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
      return repositories;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const reposDetails = async function (
  githubUsername: string,
  githubToken: string,
  repositoryName: string
) {
  console.log("repo details");
  const results = await Promise.all([
    getOwnerRepositories(githubUsername, githubToken),
    getOwnerFilesInRepo(githubUsername, githubToken, repositoryName),
  ]);
  console.log(results[results.length - 1]);
};
