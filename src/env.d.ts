/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_LASTPRICE_URL: string;
  readonly VITE_ORDERBOOK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
