
// Extensão para garantir que window.google esteja disponível
declare global {
  interface Window {
    google: typeof google;
  }
}

export {};
