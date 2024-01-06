import { Options } from './types';
import { hash, safeParseJSON } from './utils';

const DEFAULT_SEPERATOR = '.';

/**
 * Creates a signature for the specified payload and returns a token containing the payload and the signature
 *
 * @param payload The payload to be signed (e.g. an object, a number or a string)
 * @param secret A secret string for the signature
 * @param options Additional options as an object (Reference: [GitHub](https://github.com/slive-app/keys/blob/master/src/types.ts))
 * @returns {string}
 */
export const sign = <T>(
  payload: T,
  secret: string,
  options?: Options,
): string => {
  const { seperator = DEFAULT_SEPERATOR } = options ?? {};

  // Convert payload to base64url string
  const base64Payload = Buffer.from(
    typeof payload === 'string' ? payload : JSON.stringify(payload),
  ).toString('base64url');

  // Generate signature using payload and secret
  const signature = hash(base64Payload, secret);

  // Concatenate token
  return `${base64Payload}${seperator}${signature}`;
};

/**
 * Verifies the signature inside the token using the secret key
 *
 * @param token The token to be verified
 * @param secret The secret key used to create the token
 * @param options Additional options as an object (Reference: [GitHub](https://github.com/slive-app/keys/blob/master/src/types.ts))
 * @returns The payload of the token as a string or JSON object
 */
export const verify = <T>(token: string, secret: string, options?: Options) => {
  const { seperator = DEFAULT_SEPERATOR } = options ?? {};

  // Split token in payload and signature using seperator
  const [payload, signature] = token.split(seperator);
  if (!payload || !signature) return null;

  // Check signature match
  const nSignature = hash(payload, secret);
  if (nSignature !== signature) return null;

  // Convert payload to json or return as plain string
  return safeParseJSON(atob(payload)) as T;
};

export default {
  sign,
  verify,
};
