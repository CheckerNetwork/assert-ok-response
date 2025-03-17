import { describe, it } from 'node:test'
import assert from 'node:assert'
import { createJsonRpcClient } from './index.js'

describe('assert-ok-response', () => {
  it('should create a JSON-RPC client', () => {
    const client = createJsonRpcClient('http://example.com')
    assert.ok(client)
  })
})
