import { Repository } from "./Repository";

/**
 * 1.Repo name

2.Repo size

3.Repo owner

4.Private\public repo

5.Number of files in the repo

6.Content of 1 yml file (any one that appear in the repo)

7.Ative webhooks
 */
export type Details = {
  repository: Repository;
  is_private: boolean; //True - Private ; False - Public
  files: number;
  yml_content: string;
  webhooks: string;
};
