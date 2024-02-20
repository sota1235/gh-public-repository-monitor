export const fmtGhRes = (
  repositories: {
    name: string;
    url: string;
  }[],
): string => {
  const msg = [];
  for (const item of repositories) {
    msg.push(`Repository Name: ${item.name}` + '\n' + `URL: ${item.url}`);
  }

  return `
Count ${repositories.length}
${msg.join('\n')}
`;
};
