import React, { useState } from 'react';
import moment from 'moment';
import marked from 'marked';

import './Notes.scss';

function Notes() {
  const [idCount, setIdCount] = useState(1);
  const [notes, setNotes] = useState([
    {
      id: 0,
      date: Date.parse('Jan 17, 2021, 12:00'),
      content: '# try markdown',
      editing: false,
    },
  ]);

  const toggleEditing = (id) =>
    setNotes(
      notes.map((item) =>
        item.id === id ? { ...item, editing: !item.editing } : item
      )
    );

  const deleteNote = (id) => {
    setNotes(notes.filter((item) => item.id !== id));
  };

  const newNote = () => {
    if (notes.length < 6) {
      setNotes([
        ...notes,
        { id: idCount, date: new Date(), content: '', editing: true },
      ]);
      setIdCount(idCount + 1);
    }
  };

  const contentChange = (e, id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, content: e.target.value } : note
      )
    );
  };

  return (
    <div id="notes" className="notes">
      <div className="notes__new" onClick={newNote}>
        NEW
      </div>
      <div className="notes__container">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`note ${note.editing ? 'editing' : ''}`}
          >
            <div className="note__top">
              <h3 onClick={() => toggleEditing(note.id)}>✏️</h3>
              <h3 className="note__top__date">
                {note.editing ? 'editing...' : moment(note.date).fromNow()}
              </h3>
              <h3 onClick={() => deleteNote(note.id)}>❌</h3>
            </div>
            {note.editing ? (
              <div className="note__editing">
                <textarea
                  onChange={(e) => contentChange(e, note.id)}
                  value={note.content}
                />
              </div>
            ) : (
              <div
                className="note__content"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: marked(note.content) }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
