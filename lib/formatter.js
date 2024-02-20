"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fmtGhRes = void 0;
const fmtGhRes = (repositories) => {
    const msg = [];
    for (const item of repositories) {
        msg.push(`Repository Name: ${item.name}` + '\n' + `URL: ${item.url}`);
    }
    return `
Count ${repositories.length}
${msg.join('\n')}
`;
};
exports.fmtGhRes = fmtGhRes;
