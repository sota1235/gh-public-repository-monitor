"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = require("./formatter");
test('should return null', () => {
    expect(formatter_1.fmtGhRes({
        total_count: 0,
        items: [],
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
    expect(formatter_1.fmtGhRes({
        total_count: 2,
        items: [
            {
                repository: {
                    name: 'test repository',
                },
                url: 'https://example.com/',
            },
            {
                repository: {
                    name: 'test repository2',
                },
                url: 'https://example.com/2',
            },
        ],
    })).toBe(expectedMessage);
});
