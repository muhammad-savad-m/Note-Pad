import NoteCard from "./noteCard";

function NoteList({
  notes,
  onEdit,
  onDelete,
  onArchive,
  onPin,
  selectedNotes,
  onSelect,
}) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-20">

        <div className="text-6xl mb-4">
          📝
        </div>

        <h2 className="text-xl font-bold text-gray-700">
          No notes found
        </h2>

        <p className="text-gray-500 mt-2">
          Create a note to get started.
        </p>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
            onArchive={onArchive}
            onPin={onPin}
            selected={selectedNotes.includes(note.id)}
            onSelect={onSelect}
          />
        ))}

      </div>

    </div>
  );
}

export default NoteList;