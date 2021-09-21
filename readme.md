# Github Action to search and replace text

## Validate action

Validate the action by referencing ./ in a workflow in your repo

```yml
uses: ./
with:
  include: *.txt
  find: 'blah'
  replace: 'blahx'
```
