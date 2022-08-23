import { p as promiseResolve, b as bootstrapLazy } from './index-4c3857bf.js';

/*
 Stencil Client Patch Browser v2.17.4 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["flex-resizer",[[2,"flex-resizer",{"depth":[2],"overrideIframe":[4,"override-iframe"],"name":[1],"save":[4],"disabled":[4]},[[1,"mousedown","resizeStart"],[1,"touchstart","resizeStart"]]]]]], options);
});
