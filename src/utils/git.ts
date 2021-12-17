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

export const extractGithubRepositoriesDetails = (data: unknown) => {
  let repositories: Details[] = [];
  if (Array.isArray(data)) {
    repositories = data.map((repo: any) => {
      var obj: Details = {
        repository: extractGithubRepositoryList(repo),
        is_private: repo.private,
        files: repo.files,
        yml_content: repo.yml_content,
        webhooks: repo.webhooks,
      };
      return obj;
    });
  }
  return repositories;
};
