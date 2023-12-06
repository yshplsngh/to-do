import React, { useEffect, useState } from "react";
import { BeakerIcon } from "@heroicons/react/24/solid";

import "./App.css";
let idno = 0;
const App = () => {
  const [text, setText] = useState("");
  const [note, setNote] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      return;
    } else if (editing && editId) {
      setNote(
        note.map((item) => {
          if (item.id === editId) {
            return { ...item, title: text };
          }
          return item;
        })
      );
      setEditId(null);
      setText("");
      setEditing(false);
    } else {
      const notetext = { id: idno++, title: text };
      setNote([...note, notetext]);
      setText("");
      setEditId();
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    setNote([...note.slice(0, id), ...note.slice(id + 1, note.length)]);
  };

  const handleEdit = (id) => {
    console.log(id);
    const num = note.find((note) => note.id === id);
    setText(num.title);
    setEditId(id);
    setEditing(true);
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="op"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="bg-slate-600">
            Add
          </button>
        </form>
      </div>

      <div className="my-10">
        {note
          .slice()
          .reverse()
          .map((item) => {
            const { id, title } = item;
            // console.log(id)
            return (
              <div key={id} className="flex justify-between">
                <p>{title}</p>
                <span>
                  <span className="op" onClick={() => handleEdit(id)}>
                    edit
                  </span>
                  <span className="op" onClick={() => handleDelete(id)}>
                    delete
                  </span>
                </span>
              </div>
            );
          })}
      </div>

      {note.length > 0 && (
        <button className="op" onClick={() => setNote([])}>
          clear note
        </button>
      )}
    </div>
  );
};

export default App;
