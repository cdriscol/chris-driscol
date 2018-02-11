// @flow
import 'isomorphic-fetch';

class FetcherBase {
  url: string;

  constructor(url) {
    this.url = url;
  }

  async fetch(operation, variables) {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: operation.text, variables }),
    });
    return response.json();
  }
}

export class ServerFetcher extends FetcherBase {
  payloads: Array<any>;

  constructor(url: string) {
    super(url);
    this.payloads = [];
  }

  async fetch(...args: Array<any>) {
    const i = this.payloads.length;
    this.payloads.push(null);
    const payload = await super.fetch(...args);
    this.payloads[i] = payload;
    return payload;
  }

  toJSON() {
    return this.payloads;
  }
}

export class ClientFetcher extends FetcherBase {
  payloads: Array<any>;

  constructor(url: string, payloads: Array<any>) {
    super(url);

    this.payloads = payloads;
  }

  async fetch(...args: Array<any>) {
    if (this.payloads.length) {
      return this.payloads.shift();
    }

    return super.fetch(...args);
  }
}
