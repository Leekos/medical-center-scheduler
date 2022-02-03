import React from "react";
import { useState } from "react/cjs/react.development";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("wypełnij pola");
      return;
    }
    onAdd({ text, day, reminder });
    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Dodaj zadanie"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day and Time</label>
        <input
          type="text"
          placeholder="dzień i czas"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control-check">
        <label>Przypomnienia</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="dodaj zadanie" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
