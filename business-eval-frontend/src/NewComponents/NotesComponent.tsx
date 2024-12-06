import React, { useState } from "react";

interface Props {
  state: any;
  updateState: (key: string, value: any) => void;
}

const NotesComponent: React.FC<Props> = ({ state, updateState }) => {
  const [isOpen, setIsOpen] = useState(false);


  const handleOpenNotes = () => {
    setIsOpen(true);
  };

  const handleCloseNotes = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-4">
      <div className=" p-4 rounded-md ">
        <h3 className="text-lg font-semibold">Notes</h3>
        <button
          onClick={handleOpenNotes}
          className="fixed  bottom-4 right-2 text-blue-500 hover:text-blue-700 rounded-full "
        >
          Notes
        </button>
      </div>

      {/* Modal for viewing notes */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Notes</h3>
            {Object.entries(state.notes).map(([key, noteArray]) => (
              <div key={key} className="note-item">
                <h3 className="font-semibold">
                  {key.replace(/([A-Z])/g, " $1")}
                </h3>
                {Array.isArray(noteArray) && noteArray.length > 0 ? (
                  noteArray.map((note, index) => (
                    <p key={index} className="note">
                      {note}
                    </p>
                  ))
                ) : (
                  <p>No notes available</p>
                )}
              </div>
            ))}

            <div className="py-2">
              <p className="font-semibold">No notes available</p>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleCloseNotes}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesComponent;
