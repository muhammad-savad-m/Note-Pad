function SearchFilter({
  sort,
  setSort,
  filterColor,
  setFilterColor,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-5">

      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-3">

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="date">Sort by date</option>
          <option value="title">Sort by title</option>
          <option value="color">Sort by color</option>
        </select>

        {/* Color */}

        <select
          value={filterColor}
          onChange={(e) => setFilterColor(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="all">All colors</option>
          <option value="yellow">Yellow</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          <option value="pink">Pink</option>
          <option value="purple">Purple</option>
          <option value="orange">Orange</option>
        </select>

      </div>

    </div>
  );
}

export default SearchFilter;