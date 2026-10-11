/// <reference types="vite/client" />

interface Window {
  /** Set by main.tsx once the app starts; read by the failsafe in index.html. */
  __booted?: boolean;
}
