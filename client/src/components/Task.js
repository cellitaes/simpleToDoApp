import React from 'react';

const Task = (props) => {

  const style = {
    color: 'red',
  }

  const { text, date, _id, active, important, finishDate } = props.task;

  if (active) {
    return (
      <div className='container d-flex mt-4'>
        <p className='w-100 d-flex'>
          <strong style={important ? style : null}>{text}</strong> - do <span className=''>{new Date(date).toLocaleDateString()} </span>
          <span className='d-flex flex-grow-1 justify-content-end'>
            <button className='btn btn-success ' onClick={() => props.change(_id)}>Zostało zrobione</button>
            <button className='btn btn-danger' onClick={() => props.delete(_id)}>X</button>
          </span>
        </p>

      </div >
    );
  } else {

    const finish = new Date(finishDate).toLocaleString()
    return (
      <div>

        <p>
          <strong>{text}</strong><em> (zrobić do {new Date(date).toLocaleDateString()})</em><br />
          - potwierdzenie wykonania<span> {finish}  </span>

          <button className='btn btn-danger' onClick={() => props.delete(_id)}>X</button>
        </p>
      </div>
    )
  }
}

export default Task;