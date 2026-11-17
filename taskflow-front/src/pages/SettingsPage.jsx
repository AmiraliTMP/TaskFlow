function SettingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-2 text-sm text-gray-400">
          Manage your application preferences.
        </p>
      </div>

      <div className="space-y-5 rounded-xl border border-white/10 bg-[#1D2027] p-5">
        <div>
          <h2 className="font-semibold">Appearance</h2>
          <p className="mt-1 text-sm text-gray-400">
            Customize the look and feel of Taskflow.
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <div>
            <p className="text-sm font-medium">Theme</p>
            <p className="mt-1 text-xs text-gray-500">
              Current application theme
            </p>
          </div>
          <span className="rounded-lg bg-white/5 px-3 py-2 text-sm">Dark</span>
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;
