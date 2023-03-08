import Util from '../util/Util.js';
import V1Router from '../v1/LoginRouter.js';
import WidgetRouter from '../v2/WidgetRouter.js';

// Default router factory will detect between classic and OIE pipeline
function routerClassFactory(options) {
  let Router;

  // V1 ("classic") flow will load under these conditions:
  const v1DefaultFlow = !options.stateToken && !options.clientId && !options.proxyIdxResponse; // Default entry flow on okta-hosted login page
  const v1StateTokenFlow = options.stateToken && Util.isV1StateToken(options.stateToken); // Resuming a flow on okta-hosted login page
  const v1AuthFlow = options.clientId && options.useClassicEngine === true; // Self hosted widget can set the `useClassicEngine` option to use V1Router

  if (v1DefaultFlow || v1StateTokenFlow || v1AuthFlow) {
    Router = V1Router;
  } else {
    Router = WidgetRouter;
  }
  return Router;
}

export { routerClassFactory };
//# sourceMappingURL=default.js.map
