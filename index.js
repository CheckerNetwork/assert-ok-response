/**
 * @param {string | URL} url
 * @param {object} options
 * @param {string[][] | Record<string, string | ReadonlyArray<string>> | Headers} [options.requestHeaders]
 * @param {typeof fetch} [options.fetchFn] Custom fetch function (useful for testing)
 * @param {console['log']} [options.debugLog] Debug logger
 */
export function createJsonRpcClient(url, { requestHeaders, fetchFn } = {}) {
  fetchFn = fetchFn ?? fetch

  /**
   * @param {string} method
   * @param {[unknown]} [params]
   */
  const rpc = async (method, params) => {
    // TODO
  }
  return rpc
}
