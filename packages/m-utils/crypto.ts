import * as crypto from 'crypto';

export function hmac(key: string, message: string) {
  return crypto.createHmac('SHA256', key).update(message).digest('base64');
}

export function gid(obj: any): string {
  return obj.toString();
}

export function base64Encode(source: string): string {
  return Buffer.from(source).toString('base64');
}

export function base64Decode(source: string): string {
  return Buffer.from(source, 'base64').toString('ascii');
}