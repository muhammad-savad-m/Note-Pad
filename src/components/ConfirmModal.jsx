function ConfirmModal({
  onConfirm,
  onCancel,
  message,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">

        <h2 className="text-lg font-bold">
          Confirm Action
        </h2>

        <p className="text-gray-600 mt-2">
          {message}
        </p>

        <div className="flex gap-2 mt-6 justify-end">

          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Confirm
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;