import {
  getOwnerActiveWebhooksInRepo,
  getOwnerFilesInRepo,
  getOwnerRepositories,
  getOwnerYmlContentInRepo,
} from "./services/git.service";
import { Details } from "./types/Details";
import { Repository } from "./types/Repository";
import {
  extractGithubRepositoriesList,
  extractGithubRepositoryDetails,
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
  const results: any = await Promise.all([
    getOwnerRepositories(githubUsername, githubToken),
    getOwnerFilesInRepo(githubUsername, githubToken, repositoryName),
    getOwnerActiveWebhooksInRepo(githubUsername, githubToken, repositoryName),
  ]);
  try {
    //Repository[] of user
    const userRepositories = results[0];
    //getting all files
    const filesResult = results[1].tree;
    //getting webhooks and filtering to active
    const webHooksResult = results[2].filter(
      (webhook: any) => webhook.active === true
    );
    //getting first yml file path
    let ymlFilePath = "";
    let ymlFileContent = "";
    for (let i = 0; i < filesResult.length; i++) {
      if (filesResult[i].path.includes(".yml")) {
        ymlFilePath = filesResult[i].path;
        break;
      }
    }
    getOwnerYmlContentInRepo(
      githubUsername,
      githubToken,
      repositoryName,
      ymlFilePath
    )
      .then((res: any) => {
        ymlFileContent = res.content;
        //final obj which contains all relevant fields
        const obj = extractGithubRepositoryDetails(
          userRepositories,
          repositoryName,
          filesResult.length,
          ymlFileContent,
          webHooksResult
        );
        return obj;
      })
      .catch((err) => console.error(err));
  } catch (e) {
    console.error(e);
  }
};
