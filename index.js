/**
 * @param {Response} res The Response object returned by a fetch request.
 * @param {string} [errorMsg] An optional error message to include in the error thrown if the response is not ok.
 */
export async function assertOkResponse(res, errorMsg) {
  if (res.ok) return

  let body
  try {
    body = await res.text()
  } catch (/** @type {any} */ err) {
    body = `(Cannot read response body: ${err.message ?? err})`
  }
  body = body?.trimEnd()
  const err = new Error(`${errorMsg ?? `Cannot fetch ${res.url}`} (${res.status}): ${body}`)
  Object.assign(err, {
    statusCode: res.status,
    serverMessage: body,
  })
  throw err
}
