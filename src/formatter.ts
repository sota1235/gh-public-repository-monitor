import { GhSearchCodeRes } from './gh';

export const fmtGhRes = (res: GhSearchCodeRes): string | null => {
  const { data } = res;
  if (data.search.repositoryCount === 0) {
    return null;
  }

  const msg = [];

  for (const item of data.search.nodes) {
    msg.push(`Repository Name: ${item.name}` + '\n' + `URL: ${item.url}`);
  }

  return `
Count ${data.search.repositoryCount}
${msg.join('\n')}
`;
};
