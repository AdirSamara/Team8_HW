import { Details } from "../types/Details";
import { Repository } from "../types/Repository";

const extractGithubRepositoryList = (repo: any) => {
  return {
    name: repo.name as string,
    size: repo.size as number,
    owner: repo.owner.login as string,
  };
};
/**
 *
 * @param userRepositories all user repositories from task1
 * @returns Repository list of user
 */
export const extractGithubRepositoriesList = (userRepositories: any) => {
  let repositories: Repository[] = [];
  if (Array.isArray(userRepositories)) {
    repositories = userRepositories.map((repo: any) =>
      extractGithubRepositoryList(repo)
    );
  }
  return repositories;
};

/**
 *
 * @param userRepositories all user repositories from task1
 * @param repositoryName specific repository name
 * @param files number of files in repository
 * @param ymlFileContent some yml file content
 * @param activeWebhooks active webhooks
 * @returns Details obj of specifc repository
 */
export const extractGithubRepositoryDetails = (
  userRepositories: any,
  repositoryName: string,
  files: number,
  ymlFileContent: string,
  activeWebhooks: string[]
) => {
  //filtering to the specifc repo and get Repository type from it
  const userRepository = userRepositories.filter(
    (repo: any) => repo.name === repositoryName
  )[0];
  var obj: Details = {
    repository: extractGithubRepositoryList(userRepository),
    is_private: userRepository.private,
    files: files,
    yml_content: ymlFileContent,
    webhooks: activeWebhooks,
  };
  return obj;
};
