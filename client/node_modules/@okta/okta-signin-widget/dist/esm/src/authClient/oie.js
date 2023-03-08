import { createIdxOptionsConstructor, createIdxStorageManager, createIdxTransactionManager, createOktaAuthOAuth, mixinIdx } from '@okta/okta-auth-js';

// OIE supports only IDX pipeline

// okta-auth-js supports a mixin pattern that allows us to compose a custom version containing only the code we need
// build an AuthJS client that supports only the OIE engine

const OptionsConstructor = createIdxOptionsConstructor();
const StorageManager = createIdxStorageManager();
const IdxTransactionManager = createIdxTransactionManager();

// Start with OAuth as base
const OktaAuthOAuth = createOktaAuthOAuth(StorageManager, OptionsConstructor, IdxTransactionManager);

// Mixin IDX support
const OktaAuth = mixinIdx(OktaAuthOAuth);

export { OktaAuth };
//# sourceMappingURL=oie.js.map
