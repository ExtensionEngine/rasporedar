import status from 'http-status';

export function makeError(message: string, statusCode = status.INTERNAL_SERVER_ERROR) {
  return { error: new Error(message), status: statusCode };
}
