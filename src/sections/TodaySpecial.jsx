function TodaySpecial() {
  return (
    <section
      id="today-special"
      className="relative w-full bg-transparent px-4 py-16 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
          Today
        </p>

        <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          Today's Special
        </h2>
      </div>
    </section>
  );
}

export default TodaySpecial;