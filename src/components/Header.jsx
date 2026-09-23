function Header({
  search,
  setSearch,
  showArchived,
  setShowArchived,
}) {
  return (
    <header className="bg-white border-b sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              📝 My Notes
            </h1>

            <p className="text-sm text-gray-500">
              Keep your thoughts organized
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={() => setShowArchived(false)}
              className={`px-4 py-2 rounded-lg ${
                !showArchived
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              Notes
            </button>

            <button
              onClick={() => setShowArchived(true)}
              className={`px-4 py-2 rounded-lg ${
                showArchived
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              Archive
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;