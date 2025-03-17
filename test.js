import { describe, it } from 'node:test'
import assert from 'node:assert'
import { createJsonRpcClient } from './index.js'

describe('tiny-json-rpc', () => {
  it('should create a JSON-RPC client', () => {
    const client = createJsonRpcClient('http://example.com')
    assert.ok(client)
  })
})
