import { OktaAuth } from '../../authClient/default.js';
import { routerClassFactory } from '../../router/default.js';
import { createOktaSignIn } from '../../widget/OktaSignIn.js';

// Default supports both IDX and Authn pipelines
class OktaSignIn extends createOktaSignIn(OktaAuth, routerClassFactory) {
  constructor(options) {
    super(options);
  }
}

export { OktaSignIn, OktaSignIn as default };
//# sourceMappingURL=default.js.map
