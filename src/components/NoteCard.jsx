function NoteCard({
  note,
  onEdit,
  onDelete,
  onArchive,
  onPin,
  selected,
  onSelect,
}) {
  const colorClasses = {
    yellow: "bg-yellow-100/50",
    blue: "bg-blue-100/50",
    green: "bg-green-100/50",
    pink: "bg-pink-100/50",
    purple: "bg-purple-100/50",
    orange: "bg-orange-100/50",
  };

  return (
    <div
      className={`
        ${colorClasses[note.color]}
        backdrop-blur-xl
        border border-white/70
        rounded-2xl
        shadow-md
        p-5
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        relative
      `}
    >
      {/* Selection */}
      <div className="absolute top-3 left-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(note.id)}
        />
      </div>

      {/* Pin */}
      {note.pinned && (
        <span className="absolute top-3 right-3">
          📌
        </span>
      )}

      <div className="pt-5">

        {/* Title */}
        {note.title && (
          <h3 className="font-bold text-lg mb-2 break-words">
            {note.title}
          </h3>
        )}

        {/* Content */}
        <p className="text-gray-700 whitespace-pre-wrap break-words">
          {note.content}
        </p>

        {/* Tags */}
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-4">
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-white/60 backdrop-blur-sm px-2 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Date */}
        <div className="text-xs text-gray-500 mt-4">
          Updated:{" "}
          {new Date(note.updatedAt).toLocaleString()}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-4">

          <button
            onClick={() => onEdit(note)}
            className="px-3 py-1 bg-white/60 hover:bg-white/80 rounded-lg text-sm"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => onPin(note.id)}
            className="px-3 py-1 bg-white/60 hover:bg-white/80 rounded-lg text-sm"
          >
            {note.pinned ? "Unpin" : "📌 Pin"}
          </button>

          <button
            onClick={() => onArchive(note.id)}
            className="px-3 py-1 bg-white/60 hover:bg-white/80 rounded-lg text-sm"
          >
            {note.archived ? "Unarchive" : "Archive"}
          </button>

          <button
            onClick={() => onDelete(note.id)}
            className="px-3 py-1 bg-red-100/70 text-red-600 rounded-lg text-sm"
          >
            🗑️ Delete
          </button>

        </div>
      </div>
    </div>
  );
}

export default NoteCard;