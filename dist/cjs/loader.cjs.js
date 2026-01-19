'use strict';

var index = require('./index-DkgEQH6a.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await index.globalScripts();
  return index.bootstrapLazy([["flex-resizer.cjs",[[2,"flex-resizer",{"depth":[2],"overrideIframe":[4,"override-iframe"],"name":[1],"save":[4],"disabled":[4],"refresh":[64]},[[0,"mousedown","resizeStart"],[1,"touchstart","resizeStart"]],{"name":[{"watchName":0}],"disabled":[{"watchDisabled":0}]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
