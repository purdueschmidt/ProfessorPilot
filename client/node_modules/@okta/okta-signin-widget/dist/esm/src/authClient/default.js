import { mixinAuthn } from '@okta/okta-auth-js';
import { OktaAuth as OktaAuth$1 } from './oie.js';

// Default supports both Authn and IDX pipelines

// okta-auth-js supports a mixin pattern that allows us to compose a custom version containing only the code we need
// build an AuthJS client that supports both the Classic and OIE engines

// Simply add Authn support to the IDX client
const OktaAuth = mixinAuthn(OktaAuth$1);

export { OktaAuth };
//# sourceMappingURL=default.js.map
