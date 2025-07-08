export function logError(error, info = {}) {
  // Exemplo fictício: fetch("/api/log", { method:"POST", body: JSON.stringify({ error, info }) })
  console.error("[ErrorLogger]", { error, info });
}
