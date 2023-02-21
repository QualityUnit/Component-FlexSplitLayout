'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-beec0254.js');

/*
 Stencil Client Patch Esm v2.22.2 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["flex-resizer.cjs",[[2,"flex-resizer",{"depth":[2],"overrideIframe":[4,"override-iframe"],"name":[1],"save":[4],"disabled":[4]},[[0,"mousedown","resizeStart"],[1,"touchstart","resizeStart"]]]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
