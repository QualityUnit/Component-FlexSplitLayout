'use strict';

var index = require('./index-BPjEuDoF.js');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
/*
 Stencil Client Patch Browser v4.41.1 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  if (index.BUILD.isDev && !index.BUILD.isTesting) {
    index.consoleDevInfo("Running in development mode.");
  }
  if (index.BUILD.cloneNodeFix) {
    patchCloneNodeFix(index.H.prototype);
  }
  const scriptElm = index.BUILD.scriptDataOpts ? index.win.document && Array.from(index.win.document.querySelectorAll("script")).find(
    (s) => new RegExp(`/${index.NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) || s.getAttribute("data-stencil-namespace") === index.NAMESPACE
  ) : null;
  const importMeta = (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('flex-resizer.cjs.js', document.baseURI).href));
  const opts = index.BUILD.scriptDataOpts ? (scriptElm || {})["data-opts"] || {} : {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return index.promiseResolve(opts);
};
var patchCloneNodeFix = (HTMLElementPrototype) => {
  const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
  HTMLElementPrototype.cloneNode = function(deep) {
    if (this.nodeName === "TEMPLATE") {
      return nativeCloneNodeFn.call(this, deep);
    }
    const clonedNode = nativeCloneNodeFn.call(this, false);
    const srcChildNodes = this.childNodes;
    if (deep) {
      for (let i = 0; i < srcChildNodes.length; i++) {
        if (srcChildNodes[i].nodeType !== 2) {
          clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
        }
      }
    }
    return clonedNode;
  };
};

patchBrowser().then(async (options) => {
  await index.globalScripts();
  return index.bootstrapLazy([["flex-resizer.cjs",[[2,"flex-resizer",{"depth":[2],"overrideIframe":[4,"override-iframe"],"name":[1],"save":[4],"disabled":[4],"refresh":[64]},[[0,"mousedown","resizeStart"],[1,"touchstart","resizeStart"]],{"name":[{"watchName":0}],"disabled":[{"watchDisabled":0}]}]]]], options);
});

exports.setNonce = index.setNonce;
