import { useEffect, useMemo, useState } from "react";

import Header from "./components/header";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import SearchFilter from "./components/SearchFilter";
import ConfirmModal from "./components/ConfirmModal";

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes
      ? JSON.parse(savedNotes)
      : [];
  });

  const [editingNote, setEditingNote] =
    useState(null);

  const [search, setSearch] = useState("");

  const [showArchived, setShowArchived] =
    useState(false);

  const [sort, setSort] = useState("date");

  const [filterColor, setFilterColor] =
    useState("all");

  const [selectedNotes, setSelectedNotes] =
    useState([]);

  const [confirmDelete, setConfirmDelete] =
    useState(null);

  const [loading, setLoading] = useState(true);

  // --------------------------------
  // Save notes to localStorage
  // --------------------------------

  useEffect(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes)
    );

    setLoading(false);
  }, [notes]);

  // --------------------------------
  // CREATE / UPDATE
  // --------------------------------

  const saveNote = (noteData) => {
    if (editingNote) {
      // UPDATE

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                ...noteData,
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );

      setEditingNote(null);
    } else {
      // CREATE

      const newNote = {
        id: crypto.randomUUID(),

        ...noteData,

        createdAt: new Date().toISOString(),

        updatedAt: new Date().toISOString(),

        archived: false,

        pinned: false,
      };

      setNotes((prevNotes) => [
        newNote,
        ...prevNotes,
      ]);
    }
  };

  // --------------------------------
  // DELETE
  // --------------------------------

  const deleteNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.filter(
        (note) => note.id !== id
      )
    );

    setSelectedNotes((prev) =>
      prev.filter((noteId) => noteId !== id)
    );

    setConfirmDelete(null);
  };

  // --------------------------------
  // BULK DELETE
  // --------------------------------

  const deleteSelected = () => {
    setNotes((prevNotes) =>
      prevNotes.filter(
        (note) =>
          !selectedNotes.includes(note.id)
      )
    );

    setSelectedNotes([]);

    setConfirmDelete(null);
  };

  // --------------------------------
  // ARCHIVE
  // --------------------------------

  const toggleArchive = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              archived: !note.archived,
              updatedAt:
                new Date().toISOString(),
            }
          : note
      )
    );
  };

  // --------------------------------
  // PIN
  // --------------------------------

  const togglePin = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              pinned: !note.pinned,
            }
          : note
      )
    );
  };

  // --------------------------------
  // SELECT
  // --------------------------------

  const toggleSelect = (id) => {
    setSelectedNotes((prev) =>
      prev.includes(id)
        ? prev.filter(
            (noteId) => noteId !== id
          )
        : [...prev, id]
    );
  };

  // --------------------------------
  // SEARCH + FILTER + SORT
  // --------------------------------

  const filteredNotes = useMemo(() => {
    let result = notes.filter(
      (note) =>
        note.archived === showArchived
    );

    // Search

    if (search.trim()) {
      const searchValue =
        search.toLowerCase();

      result = result.filter((note) => {
        const title =
          note.title.toLowerCase();

        const content =
          note.content.toLowerCase();

        const tags =
          note.tags.join(" ").toLowerCase();

        return (
          title.includes(searchValue) ||
          content.includes(searchValue) ||
          tags.includes(searchValue)
        );
      });
    }

    // Color filter

    if (filterColor !== "all") {
      result = result.filter(
        (note) =>
          note.color === filterColor
      );
    }

    // Sorting

    if (sort === "date") {
      result.sort(
        (a, b) =>
          new Date(b.updatedAt) -
          new Date(a.updatedAt)
      );
    }

    if (sort === "title") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sort === "color") {
      result.sort((a, b) =>
        a.color.localeCompare(b.color)
      );
    }

    // Pinned notes first

    result.sort(
      (a, b) =>
        Number(b.pinned) -
        Number(a.pinned)
    );

    return result;
  }, [
    notes,
    search,
    showArchived,
    filterColor,
    sort,
  ]);

  // --------------------------------
  // Keyboard shortcut
  // --------------------------------

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + K -> Search

      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();

        const input =
          document.querySelector(
            'input[placeholder="Search notes..."]'
          );

        input?.focus();
      }

      // Escape -> cancel edit

      if (e.key === "Escape") {
        setEditingNote(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <Header
        search={search}
        setSearch={setSearch}
        showArchived={showArchived}
        setShowArchived={setShowArchived}
      />

      {/* Create/Edit */}

      {!showArchived && (
        <NoteForm
          onSave={saveNote}
          editingNote={editingNote}
          notes={notes}
          onCancel={() =>
            setEditingNote(null)
          }
        />
      )}

      {/* Filters */}

      <SearchFilter
        sort={sort}
        setSort={setSort}
        filterColor={filterColor}
        setFilterColor={setFilterColor}
      />

      {/* Bulk actions */}

      {selectedNotes.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mb-5">

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">

            <p className="text-blue-700">
              {selectedNotes.length} note(s)
              selected
            </p>

            <div className="flex gap-2">

              <button
                onClick={() =>
                  setConfirmDelete("bulk")
                }
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete Selected
              </button>

              <button
                onClick={() =>
                  setSelectedNotes([])
                }
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                Clear
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Loading */}

      {loading ? (
        <div className="text-center py-20">
          <div className="text-3xl animate-spin">
            ⏳
          </div>

          <p className="mt-3 text-gray-500">
            Loading notes...
          </p>
        </div>
      ) : (
        <NoteList
          notes={filteredNotes}
          onEdit={setEditingNote}
          onDelete={(id) =>
            setConfirmDelete(id)
          }
          onArchive={toggleArchive}
          onPin={togglePin}
          selectedNotes={selectedNotes}
          onSelect={toggleSelect}
        />
      )}

      {/* Delete confirmation */}

      {confirmDelete && (
        <ConfirmModal
          message={
            confirmDelete === "bulk"
              ? "Delete all selected notes?"
              : "Are you sure you want to delete this note?"
          }
          onCancel={() =>
            setConfirmDelete(null)
          }
          onConfirm={() => {
            if (confirmDelete === "bulk") {
              deleteSelected();
            } else {
              deleteNote(confirmDelete);
            }
          }}
        />
      )}

    </div>
  );
}

export default App;