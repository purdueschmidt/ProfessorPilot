import { loc } from '../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/handle-url.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-base64.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-i18n.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-img.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-markdown.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-xsrfTokenInput.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import '../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';
import Logger from '../../util/Logger.js';
import { ConfigError } from '../../util/Errors.js';
import { OktaAuth } from '../../authClient/oie.js';
import { routerClassFactory } from '../../router/oie.js';
import { createOktaSignIn } from '../../widget/OktaSignIn.js';

// OIE supports only IDX pipeline
class OktaSignIn extends createOktaSignIn(OktaAuth, routerClassFactory) {
  constructor(options) {
    super(options);
    if (options.useClassicEngine !== false) {
      Logger.error('This version of the Okta Signin Widget only supports OIE. Remove `useClassicEngine` option or set it to `false`.');
      throw new ConfigError(loc('error.config'));
    }
  }
}

export { OktaSignIn, OktaSignIn as default };
//# sourceMappingURL=oie.js.map
