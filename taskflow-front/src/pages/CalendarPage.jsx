function CalendarPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="mt-2 text-sm text-gray-400">
          Plan your schedule and keep track of deadlines.
        </p>
      </div>

      <div className="flex min-h-96 items-center justify-center rounded-xl border border-white/10 bg-[#1D2027]">
        <div className="text-center">
          <p className="text-lg font-semibold">Calendar workspace</p>
          <p className="mt-2 text-sm text-gray-500">
            Calendar scheduling will be implemented in the next stage.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CalendarPage;
