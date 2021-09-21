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

## Debugging

Set a Action Secret in your repository See [here](https://github.com/actions/toolkit/blob/master/docs/action-debugging.md) for further info.

Set the secret `ACTIONS_STEP_DEBUG` to `true`
