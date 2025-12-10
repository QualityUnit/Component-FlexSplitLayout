'use strict';

var index = require('./index-DC4iJU7_.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await index.globalScripts();
  return index.bootstrapLazy([["flex-resizer.cjs",[[258,"flex-resizer",{"depth":[2],"overrideIframe":[4,"override-iframe"],"name":[1],"save":[4],"disabled":[4],"refresh":[64]},[[0,"mousedown","resizeStart"],[1,"touchstart","resizeStart"]],{"name":["watchName"],"disabled":["watchDisabled"]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
//# sourceMappingURL=loader.cjs.js.map

//# sourceMappingURL=loader.cjs.js.map