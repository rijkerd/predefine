process.env.NODE_ENV = 'test';
process.env.DEFAULT_LOCALE = 'en';
process.env.LOCALES = 'en,sw';
process.env.PREDEFINE_NAMESPACES = 'Currency,Unit';

/* setup */
require('@lykmapipo/mongoose-test-helpers');
