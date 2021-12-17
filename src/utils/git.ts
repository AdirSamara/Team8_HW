import { Details } from "../types/Details";
import { Repository } from "../types/Repository";

const extractGithubRepositoryList = (repo: any) => {
  return {
    name: repo.name as string,
    size: repo.size as number,
    owner: repo.owner.login as string,
  };
};

export const extractGithubRepositoriesList = (data: unknown) => {
  let repositories: Repository[] = [];
  if (Array.isArray(data)) {
    repositories = data.map((repo: any) => extractGithubRepositoryList(repo));
  }
  return repositories;
};

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
