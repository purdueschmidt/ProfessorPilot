import V1Router from '../v1/LoginRouter.js';
import Util from '../util/Util.js';
import { ConfigError } from '../util/Errors.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function routerClassFactory(options) {
  if (options.stateToken && !Util.isV1StateToken(options.stateToken) || options.proxyIdxResponse) {
    throw new ConfigError('This version of the Sign-in Widget only supports Classic Engine');
  }
  return V1Router;
}

export { routerClassFactory };
//# sourceMappingURL=classic.js.map
