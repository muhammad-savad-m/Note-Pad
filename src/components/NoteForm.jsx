import { useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";

function NoteForm({
  onSave,
  editingNote,
  notes,
  onCancel,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("yellow");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setColor(editingNote.color);
      setTags(editingNote.tags.join(", "));
    } else {
      setTitle("");
      setContent("");
      setColor("yellow");
      setTags("");
    }

    setError("");
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanContent = content.trim();

    // Content validation
    if (cleanContent.length === 0) {
      setError("Content is required");
      return;
    }

    // Title validation
    if (cleanTitle.length > 100) {
      setError("Title cannot exceed 100 characters");
      return;
    }

    // Content max limit
    if (cleanContent.length > 5000) {
      setError("Content cannot exceed 5000 characters");
      return;
    }

    // Tag limit
    if (tags.length > 200) {
      setError("Tags cannot exceed 200 characters");
      return;
    }

    // Duplicate validation
    const duplicate = notes.some((note) => {
      if (editingNote && note.id === editingNote.id) {
        return false;
      }

      return (
        note.title.trim().toLowerCase() ===
          cleanTitle.toLowerCase() &&
        note.content.trim().toLowerCase() ===
          cleanContent.toLowerCase()
      );
    });

    if (duplicate) {
      setError("A note with the same title and content already exists");
      return;
    }

    const noteData = {
      title: cleanTitle,
      content: cleanContent,
      color,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    onSave(noteData);

    if (!editingNote) {
      setTitle("");
      setContent("");
      setColor("yellow");
      setTags("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-5"
      >

        <h2 className="text-xl font-bold mb-4">
          {editingNote ? "Edit Note" : "Create Note"}
        </h2>

        {/* Title */}

        <input
          type="text"
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title (optional)"
          className="w-full border-b-2 border-gray-200 px-2 py-3 text-lg outline-none focus:border-blue-400"
        />

        <div className="text-right text-xs text-gray-400 mt-1">
          {title.length}/100
        </div>

        {/* Content */}

        <textarea
          value={content}
          maxLength={5000}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          rows="6"
          className="w-full mt-4 border rounded-lg p-3 resize-none outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="text-right text-xs text-gray-400">
          {content.length}/5000
        </div>

        {/* Tags */}

        <input
          type="text"
          value={tags}
          maxLength={200}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags: work, study, personal"
          className="w-full mt-4 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Colors */}

        <div className="mt-5">

          <p className="text-sm font-semibold mb-2">
            Color
          </p>

          <ColorPicker
            color={color}
            setColor={setColor}
          />

        </div>

        {/* Error */}

        {error && (
          <p className="text-red-500 text-sm mt-4">
            ⚠️ {error}
          </p>
        )}

        {/* Buttons */}

        <div className="flex gap-2 mt-5">

          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
          >
            {editingNote ? "Update Note" : "Add Note"}
          </button>

          {editingNote && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>
  );
}

export default NoteForm;