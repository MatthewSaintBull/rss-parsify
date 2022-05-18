# rss-parsify

## Installation
Using npm:
```
$ npm install @saintbull/rss-parsify
```

## How to use

```js
  import RssParsify from '@saintbull/rss-parsify'
  const result = await RssParsify.parseToJSON('url')
  console.log(result)
```

or

```js
import RssParsify from '@saintbull/rss-parsify';
RssParsify.parseToJSON('url').then(result => {
  console.log(result);
});
```