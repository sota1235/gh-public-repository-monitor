"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = require("./formatter");
test('should return null', () => {
    expect((0, formatter_1.fmtGhRes)([])).toMatchInlineSnapshot(`
"
Count 0

"
`);
});
test('should return expected message', () => {
    expect((0, formatter_1.fmtGhRes)([
        {
            name: 'test repository',
            url: 'https://example.com/',
        },
        {
            name: 'test repository2',
            url: 'https://example.com/2',
        },
    ])).toMatchInlineSnapshot(`
"
Count 2
Repository Name: test repository
URL: https://example.com/
Repository Name: test repository2
URL: https://example.com/2
"
`);
});
