import crypto from 'crypto';

export const safeParseJSON = (
  value: string,
): string | Record<string, unknown> => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

export const hash = (data: string, secret: string): string => {
  return crypto.createHmac('sha256', secret).update(data).digest('base64url');
};
