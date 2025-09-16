export function logEvent(name, payload = {}) {
  try {
    const evt = { name, payload, ts: new Date().toISOString() };

    const q = JSON.parse(localStorage.getItem("telemetry_queue") || "[]");
    q.push(evt);
    localStorage.setItem("telemetry_queue", JSON.stringify(q));

    const url = process.env.REACT_APP_TELEMETRY_WEBHOOK_URL;
    if (url) {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(evt)
      }).catch(() => {});
    }

    if (process.env.NODE_ENV !== "production") console.log("[telemetry]", evt);
  } catch {}
}
