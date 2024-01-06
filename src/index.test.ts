import { sign, verify } from '.';

describe('slive app keys', () => {
  it('should not throw an error', () => {
    expect(() => sign('Test Payload', 'secretkey')).not.toThrowError();
  });

  it('should not be the same token', () => {
    const payload = { test: 123 };

    expect(sign(payload, 'secretkey1')).not.toBe(sign(payload, 'secretkey2'));
  });

  it('should not verify due to secret mismatch', () => {
    const token = sign({ Hello: 'World' }, 'secret123');    

    expect(verify(token, 'secret1234')).toBe(null);
  });

  it('should verify correctly', () => {
    const payload = { Hello: 'World' };
    const secret = 'secret123';

    const token = sign(payload, secret);

    expect(verify(token, secret)).toStrictEqual(payload);
  });

  it('should return as string', () => {
    const payload = '{"Hello": "World".}';
    const secret = 'secret123';

    const token = sign(payload, secret);
    const verfiedPayload = verify(token, secret);

    expect(typeof verfiedPayload).toBe('string');
  });
});
