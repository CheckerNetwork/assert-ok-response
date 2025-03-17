# assert-ok-response

A tiny helper to assert that response from `fetch()` is ok.

## Usage

```js
import { assertOkResponse } from 'assert-ok-response'

const response = await fetch('https://example.com/not-found')
await assertOkResponse(response)
//
// Throws:
//
//  const err = new Error(`${errorMsg ?? `Cannot fetch ${res.url}`} (${res.status}): ${body}`)
//                ^
//
//  Error: Cannot fetch https://example.com/not-found (404): <!doctype html>
//  [...]
//  at assertOkResponse (file:///Users/bajtos/src/assert-ok-response/index.js:15:15)
//  at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
//  at async file:///Users/bajtos/src/assert-ok-response/x.js:4:1 {
//    statusCode: 404,
//    serverMessage: '<!doctype html>\n' +
//  [...]
```

Error properties:

- `statusCode` (number) - The HTTP status code of the response.
- `serverMessage` (string) - The response body returned by the server.

## Development

- `npm test` to run the tests.
- `npm run lint:fix` to fix linting issues.
- `npx np` to publish a new version.
