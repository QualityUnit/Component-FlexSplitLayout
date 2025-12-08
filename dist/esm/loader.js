import { g as globalScripts, b as bootstrapLazy } from './index-DZODx4ga.js';
export { s as setNonce } from './index-DZODx4ga.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["flex-resizer",[[258,"flex-resizer",{"depth":[2],"overrideIframe":[4,"override-iframe"],"name":[1],"save":[4],"disabled":[4]},[[0,"mousedown","resizeStart"],[1,"touchstart","resizeStart"]],{"name":["watchName"],"disabled":["watchDisabled"]}]]]], options);
};

export { defineCustomElements };
//# sourceMappingURL=loader.js.map
