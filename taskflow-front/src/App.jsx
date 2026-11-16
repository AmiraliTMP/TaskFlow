function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101010] text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight">taskflow</h1>

        <p className="mt-4 text-gray-400">Your productivity starts here.</p>

        <p className="mt-6 text-sm text-gray-500">
          Desktop environment: {window.desktop?.platform ?? "Web"}
        </p>
      </div>
    </main>
  );
}

export default App;
