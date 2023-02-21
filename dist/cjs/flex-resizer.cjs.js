'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-beec0254.js');

/*
 Stencil Client Patch Browser v2.22.2 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('flex-resizer.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["flex-resizer.cjs",[[2,"flex-resizer",{"depth":[2],"overrideIframe":[4,"override-iframe"],"name":[1],"save":[4],"disabled":[4]},[[0,"mousedown","resizeStart"],[1,"touchstart","resizeStart"]]]]]], options);
});

exports.setNonce = index.setNonce;
