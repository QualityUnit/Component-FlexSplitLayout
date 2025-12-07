import { p as promiseResolve, b as bootstrapLazy } from './index-DrRobMHa.js';
export { s as setNonce } from './index-DrRobMHa.js';
import { g as globalScripts } from './app-globals-DQuL1Twl.js';

/*
 Stencil Client Patch Browser v4.38.3 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  const importMeta = import.meta.url;
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["flex-resizer",[[258,"flex-resizer",{"depth":[2],"overrideIframe":[4,"override-iframe"],"name":[1],"save":[4],"disabled":[4]},[[0,"mousedown","resizeStart"],[1,"touchstart","resizeStart"]],{"name":["watchName"],"disabled":["watchDisabled"]}]]]], options);
});
//# sourceMappingURL=flex-resizer.js.map
