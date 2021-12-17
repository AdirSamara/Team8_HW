import {
  getOwnerActiveWebhooksInRepo,
  getOwnerFilesInRepo,
  getOwnerRepositories,
  getOwnerYmlContentInRepo,
} from "./services/git.service";
import { Repository } from "./types/Repository";
import {
  extractGithubRepositoriesList,
  extractGithubRepositoryDetails,
} from "./utils/git";

/**
 * first task to get list of repositories
 * @param githubUsername github username
 * @param githubToken "developer token" from github
 */
export const reposList = function (
  githubUsername: string,
  githubToken: string
) {
  getOwnerRepositories(githubUsername, githubToken)
    .then((data) => {
      const repositories: Repository[] = extractGithubRepositoriesList(data);
      return repositories;
    })
    .catch((err) => {
      console.error(err);
    });
};
/**
 * second task to get details about repo
 * @param githubUsername github username
 * @param githubToken "developer token" from github
 * @param repositoryName some repo to get details on it
 */
export const reposDetails = async function (
  githubUsername: string,
  githubToken: string,
  repositoryName: string
) {
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
