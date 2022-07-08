import { p as promiseResolve, b as bootstrapLazy } from './index-0a9efe57.js';

/*
 Stencil Client Patch Esm v2.17.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["flex-resizer",[[2,"flex-resizer",{"depth":[2],"overrideIframe":[4,"override-iframe"],"name":[1],"save":[4],"disabled":[4]},[[1,"mousedown","resizeStart"],[1,"touchstart","resizeStart"]]]]]], options);
  });
};

export { defineCustomElements };
