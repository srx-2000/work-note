# js技巧性代码

## 页面包含多个Shadow DOM的页面采集

```js
var findAllShadowRootInnerHTMLs = function(root) {
  var innerHTMLs = [];
  if (root.shadowRoot) {
    innerHTMLs.push(root.shadowRoot.innerHTML);
    innerHTMLs = innerHTMLs.concat(findAllShadowRootInnerHTMLs(root.shadowRoot));
  }
  root.querySelectorAll('*').forEach(function(element) {
    if (element.shadowRoot) {
      innerHTMLs.push(element.shadowRoot.innerHTML);
      innerHTMLs = innerHTMLs.concat(findAllShadowRootInnerHTMLs(element.shadowRoot));
    }
  });
  return innerHTMLs;
};
console.log(findAllShadowRootInnerHTMLs(document.documentElement));
```

