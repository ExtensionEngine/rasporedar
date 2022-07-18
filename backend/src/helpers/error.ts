export function makeError(message: string, status = 500) {
  return { error: new Error(message), status };
}
