export const fmtGhRes = (data: GhSearchCodeRes): string | null => {
  if (data.total_count === 0) {
    return null;
  }

  let repoList = '';

  for (const item of data.items) {
    repoList += `Repository Name: ${item.repository.name}` + '\n';
    repoList += `URL: ${item.url}` + '\n';
  }

  return `
Count ${data.total_count}
${repoList}
  `;
};
