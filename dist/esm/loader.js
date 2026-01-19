import { g as globalScripts, b as bootstrapLazy } from './index-Cy5kAYI5.js';
export { s as setNonce } from './index-Cy5kAYI5.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["flex-resizer",[[2,"flex-resizer",{"depth":[2],"overrideIframe":[4,"override-iframe"],"name":[1],"save":[4],"disabled":[4],"refresh":[64]},[[0,"mousedown","resizeStart"],[1,"touchstart","resizeStart"]],{"name":[{"watchName":0}],"disabled":[{"watchDisabled":0}]}]]]], options);
};

export { defineCustomElements };
