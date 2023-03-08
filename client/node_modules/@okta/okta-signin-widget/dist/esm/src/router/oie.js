import WidgetRouter from '../v2/WidgetRouter.js';
import Util from '../util/Util.js';
import { ConfigError } from '../util/Errors.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function routerClassFactory(options) {
  if (options.stateToken && Util.isV1StateToken(options.stateToken)) {
    throw new ConfigError('This version of the Sign-in Widget does not support Classic Engine');
  }
  return WidgetRouter;
}

export { routerClassFactory };
//# sourceMappingURL=oie.js.map
