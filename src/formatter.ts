export const fmtGhRes = (data: GhSearchCodeRes): string | null => {
  if (data.total_count === 0) {
    return null;
  }

  const msg = [];

  for (const item of data.items) {
    msg.push(
      `Repository Name: ${item.repository.name}` + '\n' + `URL: ${item.url}`,
    );
  }

  return `
Count ${data.total_count}
${msg.join('\n')}
`;
};
