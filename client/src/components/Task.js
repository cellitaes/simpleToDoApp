import React from 'react';

const Task = (props) => {

  const style = {
    color: 'red',
  }

  const { text, date, _id, active, important, finishDate } = props.task;

  if (active) {
    return (
      <div>
        <p>
          <strong style={important ? style : null}>{text}</strong> - do <span>{new Date(date).toLocaleDateString()} </span>
          <button onClick={() => props.change(_id)}>Zostało zrobione</button>
          <button onClick={() => props.delete(_id)}>X</button>
        </p>

      </div>
    );
  } else {

    const finish = new Date(finishDate).toLocaleString()
    return (
      <div>

        <p>
          <strong>{text}</strong><em> (zrobić do {new Date(date).toLocaleDateString()})</em><br />
          - potwierdzenie wykonania<span> {finish}</span>

          <button onClick={() => props.delete(_id)}>X</button>
        </p>
      </div>
    )
  }
}

export default Task;