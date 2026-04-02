declare global {
  interface Window {
    midnight?: {
      mnLace?: {
        enable: () => Promise<any>;
        state: () => Promise<any>;
      }
    }
  }
}

export {}
