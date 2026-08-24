export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>JPS Backend API</h1>
      <p>This is an API-only server. Use the API endpoints at <code>/api/*</code>.</p>
      <p>Health check: <a href="/api/health">/api/health</a></p>
    </main>
  );
}
