# date-note

Save a piped buffer as a file so that it follows the pattern `YYYY-MM-DD-title` given today's date and a `title` generated from the first sentence in the file. See `test.js` for examples of accepted input.

```
$ : | vipe | npx radekstepan/date-note
```

^ [`vipe`](https://linux.die.net/man/1/vipe) lets you run your editor in the middle of a unix pipeline.
