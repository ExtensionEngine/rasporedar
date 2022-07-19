import httpStatusCodes from '../consts/httpStatusCodes';

export function makeError(message: string, status = httpStatusCodes.INTERNAL_SERVER_ERROR) {
  return { error: new Error(message), status };
}
