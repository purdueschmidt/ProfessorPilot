import { createOAuthOptionsConstructor, createOAuthStorageManager, createTransactionManager, createOktaAuthOAuth, mixinAuthn } from '@okta/okta-auth-js';

// Classic supports only Authn pipelines

// okta-auth-js supports a mixin pattern that allows us to compose a custom version containing only the code we need
// build an AuthJS client that supports only the Classic engine

const OptionsConstructor = createOAuthOptionsConstructor();
const StorageManager = createOAuthStorageManager();
const TransactionManager = createTransactionManager();

// Start with OAuth as base
const OktaAuthOAuth = createOktaAuthOAuth(StorageManager, OptionsConstructor, TransactionManager);

// Mixin Authn support
const OktaAuth = mixinAuthn(OktaAuthOAuth);

export { OktaAuth };
//# sourceMappingURL=classic.js.map
