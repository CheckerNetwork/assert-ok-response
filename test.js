import { describe, it } from 'node:test'
import assert, { AssertionError } from 'node:assert'
import { assertOkResponse } from './index.js'

describe('assertOkResponse', () => {
  it('accepts ok (200)', async () => {
    const response = createFakeResponse({
      ok: true,
    })

    await assertOkResponse(response)
  })

  it('rejects !ok (404)', async () => {
    const response = createFakeResponse({
      ok: false,
      status: 404,
      async text() {
        return 'endpoint not found'
      },
    })

    const error = await assertRejects(() => assertOkResponse(response))
    assert.equal(error.message, 'Cannot fetch / (404): endpoint not found')
    assert.equal(error.statusCode, 404)
    assert.equal(error.serverMessage, 'endpoint not found')
  })

  it('uses custom message when provided', async () => {
    const response = createFakeResponse({ ok: false })
    const error = await assertRejects(() =>
      assertOkResponse(response, 'Cannot post the measurement'),
    )
    assert.match(error.message, /^Cannot post the measurement/)
  })

  it('handles error while reading error response body', async () => {
    const response = createFakeResponse({
      ok: false,
      status: 500,
      async text() {
        throw new Error('chunked encoding error')
      },
    })

    const error = await assertRejects(() => assertOkResponse(response))
    assert.equal(
      error.message,
      'Cannot fetch / (500): (Cannot read response body: chunked encoding error)',
    )
    assert.equal(error.statusCode, 500)
    assert.equal(error.serverMessage, '(Cannot read response body: chunked encoding error)')
  })
})

// Note: the built-in assert.rejects() does not return the rejection (the error)
async function assertRejects(fn) {
  try {
    await fn()
  } catch (err) {
    return err
  }
  throw new AssertionError('Expected promise to reject')
}

/**
 * @param {Partial<Response>} props
 * @returns {Response}
 */
function createFakeResponse(props = {}) {
  const status = props.status ?? (props.ok ? 200 : 500)
  const ok = props.ok ?? props.status < 400
  return {
    headers: new Headers(),
    url: '/',
    async text() {
      return '(empty response body)'
    },

    ...props,

    ok,
    status,
  }
}
