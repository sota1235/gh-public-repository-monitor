gh-public-repo-monitor 
====

Simple CLI to monitor public repository on GitHub.

### Description

- You can search codes on GitHub
- If we can find any code by keyword, it'll be notified on Slack.

### Setup

```
npm i
```

### Scope

Will search code on GitHub by using [GitHub API](https://developer.github.com/v3/search/#search-code)

### How to use

```
node lib/index.js ${keyword} ${token} ${webhook} ${interval}
```

- keyword
    - Keyword you want to monitor.
- token
    - GitHub personal access token
    - You don't need to assign any permission to the token
- webhook
    - Slack incoming webhook URL
- interval(optional)
    - Interval minutes to run search logic

### Licence

This software is released under the MIT License, see LICENSE.txt.

## Author

[@sota1235](https://github.com/sota1235)
