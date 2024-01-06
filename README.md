# Slive App Keys

A package for signing and verifying tokens using a secret key.

## Setup

```sh
npm install @sliveapp/keys
```

## Usage

```ts
import { sign, verify } from '@sliveapp/keys';

const token = sign({ hello: 'World' }, 'secret123');
// = eyJIZWxsbyI6IldvcmxkIn0.C3BtbFFR0pHV4nk4dN6KaOFAP07KS5NVmC8ZBdy-sJI

const payload = verify(token, 'secret123');
// { hello: 'World' }

const payload = verify(token, 'other-secret');
// null
```

## Options

```ts
interface Options {
  /**
   * Define a seperator for the different token parts. Default: .
   */
  seperator?: string;
}
```
