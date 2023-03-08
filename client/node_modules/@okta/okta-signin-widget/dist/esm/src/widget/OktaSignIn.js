import { ConfigError } from '../util/Errors.js';
import Util from '../util/Util.js';
import Logger from '../util/Logger.js';
import getAuthClientInstance from './getAuthClient.js';
import buildRenderOptions from './buildRenderOptions.js';
import createRouter from './createRouter.js';
import Hooks from '../models/Hooks.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
const EVENTS_LIST = ['ready', 'afterError', 'afterRender'];
function createOktaSignIn(authClientConstructor, routerClassFactory) {
  return class OktaSignIn {
    constructor(options) {
      this.Router = void 0;
      this.options = void 0;
      this.hooks = void 0;
      this.router = void 0;
      this.authClient = void 0;
      Util.debugMessage(`
          The Okta Sign-In Widget is running in development mode.
          When you are ready to publish your app, embed the minified version to turn on production mode.
          See: https://developer.okta.com/code/javascript/okta_sign-in_widget#cdn
        `);
      if (!options.stateToken) {
        var _window, _window$oktaData, _window$oktaData$sign;
        // need to set stateToken here vs in Settings to determine Router.
        // oktaData is only available to SIW on custom domains.
        // set stateToken in case user wipes out stateToken when overriding options.
        options.stateToken = (_window = window) === null || _window === void 0 ? void 0 : (_window$oktaData = _window.oktaData) === null || _window$oktaData === void 0 ? void 0 : (_window$oktaData$sign = _window$oktaData.signIn) === null || _window$oktaData$sign === void 0 ? void 0 : _window$oktaData$sign.stateToken;
      }
      this.options = options;
      this.authClient = getAuthClientInstance(authClientConstructor, options);

      // validate authClient configuration against widget options
      if (options.useClassicEngine !== true && this.authClient.options.clientId && this.authClient.isPKCE() === false) {
        throw new ConfigError('OAuth2 with interaction code flow requires PKCE to be enabled on the authClient.');
      }

      // Hooks can be modified before or after render
      this.hooks = new Hooks({
        hooks: options.hooks
      });
      this.Router = routerClassFactory(options);

      // Triggers the event up the chain so it is available to the consumers of the widget.
      this.Router.prototype.Events.listenTo.call(this, this.Router.prototype, 'all', this.trigger);

      // On the first afterRender event (usually when the Widget is ready) - emit a 'ready' event
      this.once('afterRender', function (context) {
        this.trigger('ready', context);
      });
    }

    /**
     * Render the sign in widget to an element. Returns a promise that will resolve on success or reject on error.
     * @param options - options for the signin widget.
     *        Must have an el or $el property to render the widget to.
     * @param success - success callback function
     * @param error - error callback function
     */
    renderEl(renderOptions, successFn, errorFn) {
      if (this.router) {
        throw new Error('An instance of the widget has already been rendered. Call remove() first.');
      }
      const res = createRouter(this.Router, this.options, renderOptions, this.authClient, successFn, errorFn, this.hooks);
      this.router = res.router;
      return res.promise;
    }
    hide() {
      if (this.router) {
        this.router.hide();
      }
    }
    show() {
      if (this.router) {
        this.router.show();
      }
    }
    remove() {
      if (this.router) {
        this.router.remove();
        this.router = undefined;
      }
    }

    /**
     * Renders the Widget and returns a promise that resolves to OAuth tokens
     * @param options - options for the signin widget
     */
    showSignInToGetTokens(options) {
      const renderOptions = Object.assign(buildRenderOptions(this.options, options), {
        redirect: 'never'
      });
      const promise = this.renderEl(renderOptions).then(res => {
        return res.tokens;
      });
      const authClient = this.router.settings.getAuthClient();
      if (authClient.isAuthorizationCodeFlow() && !authClient.isPKCE()) {
        throw new ConfigError('"showSignInToGetTokens()" should not be used for authorization_code flow. ' + 'Use "showSignInAndRedirect()" instead');
      }
      return promise;
    }

    /**
     * Renders the widget and redirects to the OAuth callback
     * @param options - options for the signin widget
     */
    showSignInAndRedirect(options) {
      const renderOptions = Object.assign(buildRenderOptions(this.options, options), {
        redirect: 'always'
      });
      return this.renderEl(renderOptions).then(() => {
        // This method should never return, it will either redirect or reject with error
        return;
      });
    }

    /**
     * Renders the widget. Either resolves the returned promise, or redirects.
     * @param options - options for the signin widget
     */
    showSignIn(options) {
      const renderOptions = Object.assign(buildRenderOptions(this.options, options));
      return this.renderEl(renderOptions);
    }

    // Hook convenience functions
    before(formName, callbackFn) {
      this.hooks.mergeHook(formName, {
        before: [callbackFn]
      });
    }
    after(formName, callbackFn) {
      this.hooks.mergeHook(formName, {
        after: [callbackFn]
      });
    }
    getUser() {
      var _this$router, _this$router$appState;
      return (_this$router = this.router) === null || _this$router === void 0 ? void 0 : (_this$router$appState = _this$router.appState) === null || _this$router$appState === void 0 ? void 0 : _this$router$appState.getUser();
    }

    // Events API

    on(event, callback) {
      // custom events listener on widget instance to trap third-party callback errors
      if (EVENTS_LIST.includes(event)) {
        const origCallback = callback;
        callback = function (...callbackArgs) {
          try {
            origCallback.apply(this, callbackArgs);
          } catch (err) {
            Logger.error(`[okta-signin-widget] "${event}" event handler error:`, err);
          }
        };
      }
      this.Router.prototype.Events.on.call(this, event, callback);
    }
    off(event, callback) {
      this.Router.prototype.Events.off.call(this, event, callback);
    }
    once(event, callback) {
      this.Router.prototype.Events.once.call(this, event, callback);
    }
    stopListening(event, callback) {
      this.Router.prototype.Events.stopListening.call(this, event, callback);
    }
    listenTo(object, event, callback) {
      this.Router.prototype.Events.listenTo.call(this, object, event, callback);
    }
    trigger(event, ...args) {
      this.Router.prototype.Events.trigger.apply(this, [event, ...args]);
    }
  };
}

export { createOktaSignIn };
//# sourceMappingURL=OktaSignIn.js.map
