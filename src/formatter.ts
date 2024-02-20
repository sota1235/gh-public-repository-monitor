import { GhSearchCodeRes } from './gh';

export const fmtGhRes = (res: GhSearchCodeRes): string => {
  const { data } = res;
  const msg = [];

  for (const item of data.search.nodes) {
    msg.push(`Repository Name: ${item.name}` + '\n' + `URL: ${item.url}`);
  }

  return `
Count ${data.search.repositoryCount}
${msg.join('\n')}
`;
};
