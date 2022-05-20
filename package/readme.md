# rss-parsify

## Installation
Using npm:
```
$ npm install @saintbull/vue-rss-parsify
```

## How to use

```js
  import RssParsify from '@saintbull/vue-rss-parsify'
  const result = await RssParsify.parseToJSON('url')
  const contentParsed = RssParsify.parseHTML(result[0].content)
  console.log(contentParsed)
```

or

```js
import RssParsify from '@saintbull/vue-rss-parsify';
RssParsify.parseToJSON(url).then(result => {
  console.log(RssParsify.parseHTML(result[0].content))
});
```