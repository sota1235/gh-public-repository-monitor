"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fmtGhRes = (data) => {
    if (data.total_count === 0) {
        return null;
    }
    const msg = [];
    for (const item of data.items) {
        msg.push(`Repository Name: ${item.repository.name}` + '\n' + `URL: ${item.url}`);
    }
    return `
Count ${data.total_count}
${msg.join('\n')}
`;
};
