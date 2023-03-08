import _Handlebars2 from '../../../../packages/@okta/courage-dist/esm/lib/handlebars/dist/cjs/handlebars.runtime.js';
import { View, createButton, loc } from '../../../../packages/@okta/courage-dist/esm/src/CourageForSigninWidget.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/handle-url.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-base64.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-i18n.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-img.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-markdown.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/handlebars/helper-xsrfTokenInput.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/framework/Model.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/vendor/lib/backbone.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/jquery-wrapper.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/util/underscore-wrapper.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/models/Model.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/models/BaseModel.js';
import '../../../../packages/@okta/courage-dist/esm/src/courage/framework/View.js';
import Backbone_ListView from '../../../../packages/@okta/courage-dist/esm/src/courage/views/Backbone.ListView.js';

const AuthenticatorRow = View.extend({
  className: 'authenticator-row clearfix',
  template: _Handlebars2.template({
    "1": function (container, depth0, helpers, partials, data) {
      var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"factor-icon authenticator-icon " + alias3((helper = (helper = lookupProperty(helpers, "iconClassName") || (depth0 != null ? lookupProperty(depth0, "iconClassName") : depth0)) != null ? helper : alias2, typeof helper === "function" ? helper.call(alias1, {
        "name": "iconClassName",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 100
          },
          "end": {
            "line": 1,
            "column": 117
          }
        }
      }) : helper)) + " custom-logo\" role=\"img\" aria-label=\"" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.auth.logo.aria.label"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 154
          },
          "end": {
            "line": 1,
            "column": 209
          }
        }
      })) + "\"></div>";
    },
    "3": function (container, depth0, helpers, partials, data) {
      var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"factor-icon authenticator-icon " + alias3((helper = (helper = lookupProperty(helpers, "iconClassName") || (depth0 != null ? lookupProperty(depth0, "iconClassName") : depth0)) != null ? helper : alias2, typeof helper === "function" ? helper.call(alias1, {
        "name": "iconClassName",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 268
          },
          "end": {
            "line": 1,
            "column": 285
          }
        }
      }) : helper)) + "\" role=\"img\" aria-label=\"" + alias3((lookupProperty(helpers, "i18n") || depth0 && lookupProperty(depth0, "i18n") || alias2).call(alias1, {
        "name": "i18n",
        "hash": {
          "bundle": "login",
          "code": "oie.auth.logo.aria.label"
        },
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 310
          },
          "end": {
            "line": 1,
            "column": 365
          }
        }
      })) + "\"></div>";
    },
    "5": function (container, depth0, helpers, partials, data) {
      return "authenticator-label--small";
    },
    "7": function (container, depth0, helpers, partials, data) {
      var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<p class=\"authenticator-description--text " + alias4((helper = (helper = lookupProperty(helpers, "noTranslateClassName") || (depth0 != null ? lookupProperty(depth0, "noTranslateClassName") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
        "name": "noTranslateClassName",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 603
          },
          "end": {
            "line": 1,
            "column": 627
          }
        }
      }) : helper)) + "\">" + alias4((helper = (helper = lookupProperty(helpers, "description") || (depth0 != null ? lookupProperty(depth0, "description") : depth0)) != null ? helper : alias2, typeof helper === alias3 ? helper.call(alias1, {
        "name": "description",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 629
          },
          "end": {
            "line": 1,
            "column": 644
          }
        }
      }) : helper)) + "</p>";
    },
    "9": function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "data-se=\"" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "buttonDataSeAttr") || (depth0 != null ? lookupProperty(depth0, "buttonDataSeAttr") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(depth0 != null ? depth0 : container.nullContext || {}, {
        "name": "buttonDataSeAttr",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 728
          },
          "end": {
            "line": 1,
            "column": 748
          }
        }
      }) : helper)) + "\"";
    },
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty = container.lookupProperty || function (parent, propertyName) {
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return parent[propertyName];
          }
          return undefined;
        };
      return "<div class=\"authenticator-icon-container\">" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "logoUri") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(1, data, 0),
        "inverse": container.program(3, data, 0),
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 42
          },
          "end": {
            "line": 1,
            "column": 380
          }
        }
      })) != null ? stack1 : "") + "</div><div class=\"authenticator-description\"><div><h3 class=\"authenticator-label no-translate " + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "description") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(5, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 474
          },
          "end": {
            "line": 1,
            "column": 526
          }
        }
      })) != null ? stack1 : "") + "\">" + container.escapeExpression((helper = (helper = lookupProperty(helpers, "label") || (depth0 != null ? lookupProperty(depth0, "label") : depth0)) != null ? helper : container.hooks.helperMissing, typeof helper === "function" ? helper.call(alias1, {
        "name": "label",
        "hash": {},
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 528
          },
          "end": {
            "line": 1,
            "column": 537
          }
        }
      }) : helper)) + "</h3>" + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "description") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(7, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 542
          },
          "end": {
            "line": 1,
            "column": 655
          }
        }
      })) != null ? stack1 : "") + "</div><div class=\"authenticator-button\" " + ((stack1 = lookupProperty(helpers, "if").call(alias1, depth0 != null ? lookupProperty(depth0, "buttonDataSeAttr") : depth0, {
        "name": "if",
        "hash": {},
        "fn": container.program(9, data, 0),
        "inverse": container.noop,
        "data": data,
        "loc": {
          "start": {
            "line": 1,
            "column": 695
          },
          "end": {
            "line": 1,
            "column": 756
          }
        }
      })) != null ? stack1 : "") + "></div></div>";
    },
    "useData": true
  }),
  postRender: function () {
    View.prototype.postRender.apply(this, arguments);
    const logoUri = this.model.get('logoUri');
    if (logoUri) {
      this.el.querySelector('.custom-logo').style.backgroundImage = `url(${logoUri})`;
    }
  },
  children: function () {
    return [[createButton({
      className: 'button select-factor',
      title: function () {
        return loc('oie.verify.authenticator.button.text', 'login');
      },
      click: function () {
        this.model.trigger('selectAuthenticator', this.model.get('value'));
      }
    }), '.authenticator-button']];
  },
  minimize: function () {
    this.$el.addClass('authenticator-row-min');
  }
});
var AuthenticatorVerifyOptions = Backbone_ListView.extend({
  className: 'authenticator-verify-list authenticator-list',
  item: AuthenticatorRow,
  itemSelector: '.list-content',
  initialize: function () {
    this.listenTo(this.collection, 'selectAuthenticator', this.handleSelect);
    this.listenTo(this.model, 'invalid', this.handleModelInvalid);
  },
  handleModelInvalid: function (data, error) {
    if (this.options.name in error && !this.model.get(this.options.name)) {
      this.showAuthenticatorRequiredError();
    }
  },
  showAuthenticatorRequiredError: function () {
    const errorSummary = this.collection.length > 1 ? loc('account.unlock.authenticatorRequired.multiple', 'login') : loc('account.unlock.authenticatorRequired.single', 'login');
    this.model.trigger('error', this.model, {
      responseJSON: {
        errorSummary: errorSummary
      }
    });
  },
  handleSelect: function (data) {
    var _this$model$getProper;
    //If schema contains a required identifier to fill first then validate the form
    const validationError = this.model.validateField('identifier');
    this.model.trigger('clearFormError');
    if ((_this$model$getProper = this.model.getPropertySchema('identifier')) !== null && _this$model$getProper !== void 0 && _this$model$getProper.required && validationError) {
      this.model.trigger('invalid', this.model, validationError);
    } else {
      this.model.set(this.options.name, data);
      this.options.appState.trigger('saveForm', this.model);
    }
  },
  template: _Handlebars2.template({
    "compiler": [8, ">= 4.3.0"],
    "main": function (container, depth0, helpers, partials, data) {
      return "<div class=\"list-content\"></div>";
    },
    "useData": true
  })
});

export { AuthenticatorVerifyOptions as default };
//# sourceMappingURL=AuthenticatorVerifyOptions.js.map
