import sessionStorageHelper from './sessionStorageHelper.js';
import { interactionCodeFlow } from './interactionCodeFlow.js';
import { FORMS } from '../ion/RemediationConstants.js';
import transformIdxResponse from '../ion/transformIdxResponse.js';

async function updateAppState(appState, idxResponse) {
  const settings = appState.settings;
  const lastResponse = appState.get('idx');
  const useInteractionCodeFlow = settings.get('oauth2Enabled');
  if (useInteractionCodeFlow) {
    if (idxResponse.interactionCode) {
      // Although session.stateHandle isn't used by interation flow,
      // it's better to clean up at the end of the flow.
      sessionStorageHelper.removeStateHandle();
      // This is the end of the IDX flow, now entering OAuth
      const tokens = await interactionCodeFlow(settings, idxResponse);
      // reset terminal view in case the were OAuth errors prior to successful token retrieval
      if (appState.get('currentFormName') === FORMS.TERMINAL) {
        appState.unset('currentFormName', {
          silent: true
        });
      }
      return tokens;
    }
  } else {
    // Do not save state handle for the first page loads.
    // Because there shall be no difference between following behavior
    // 1. bootstrap widget
    //    -> save state handle to session storage
    //    -> refresh page
    //    -> introspect using sessionStorage.stateHandle
    // 2. bootstrap widget
    //    -> do not save state handle to session storage
    //    -> refresh page
    //    -> introspect using options.stateHandle
    if (lastResponse) {
      var _idxResponse$context;
      sessionStorageHelper.setStateHandle(idxResponse === null || idxResponse === void 0 ? void 0 : (_idxResponse$context = idxResponse.context) === null || _idxResponse$context === void 0 ? void 0 : _idxResponse$context.stateHandle);
    }
    // Login flows that mimic step up (moving forward in login pipeline) via internal api calls,
    // need to clear stored stateHandles.
    // This way the flow can maintain the latest state handle. For eg. Device probe calls
    if (appState.get('currentFormName') === FORMS.CANCEL_TRANSACTION) {
      sessionStorageHelper.removeStateHandle();
    }
  }

  // transform response
  const ionResponse = transformIdxResponse(settings, idxResponse, lastResponse);
  await appState.setIonResponse(ionResponse);
}

export { updateAppState };
//# sourceMappingURL=updateAppState.js.map
