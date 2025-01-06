export const environment = {
  production: import.meta.env.PROD,
  development: import.meta.env.DEV,
  apiUrl: import.meta.env.VITE_API_URL || "/api",
  appName: "Sistema de Acompanhamento Fiscal",
  appNameShort: "SAF",
};