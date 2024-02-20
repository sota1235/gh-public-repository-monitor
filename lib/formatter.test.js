"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = require("./formatter");
test('should return null', () => {
    expect((0, formatter_1.fmtGhRes)({
        data: {
            search: {
                repositoryCount: 0,
                nodes: [],
            },
        },
    })).toBeNull();
});
test('should return expected message', () => {
    const expectedMessage = `
Count 2
Repository Name: test repository
URL: https://example.com/
Repository Name: test repository2
URL: https://example.com/2
`;
    expect((0, formatter_1.fmtGhRes)({
        data: {
            search: {
                repositoryCount: 2,
                nodes: [
                    {
                        name: 'test repository',
                        url: 'https://example.com/',
                    },
                    {
                        name: 'test repository2',
                        url: 'https://example.com/2',
                    },
                ],
            },
        },
    })).toBe(expectedMessage);
});
