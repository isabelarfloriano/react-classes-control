import React, { useState, useEffect } from 'react';

const StudentRow = ({ student, onCellChange }) => {
  const [average, setAverage] = useState(null);
  const [oldAverage, setOldAverage] = useState(null);

  useEffect(() => {
    const sum = (Number(student.note1) + Number(student.note2) + Number(student.note3));
    const avg = sum / 3;
    setAverage(avg);
  }, [student.note1, student.note2, student.note3]);

  useEffect(() => {
    if (average !== oldAverage) {
       setOldAverage(average);
       if (average !== null) {
         onCellChange(student.id, 'average', average);
         onCellChange(student.id, 'approved', average > 70);
       }
    }
   }, [average, oldAverage, onCellChange, student.id]);

  const handleCellChange = (column, value) => {
    onCellChange(student.id, column, value);
  };

  return (
    <tr>
      <th scope="row" className='text-center align-middle'>{'GRR000'+ student.id}</th>
      <td className='text-center align-middle'>{student.name}</td>
      <td>
        <input type="number" className="form-control custom-input border-0" value={student.note1} onChange={(e) => handleCellChange('note1', e.target.value)} />
      </td>
      <td>
        <input type="number" className="form-control custom-input border-0" value={student.note2} onChange={(e) => handleCellChange('note2', e.target.value)} />
      </td>
      <td>
        <input type="number" className="form-control custom-input border-0" value={student.note3} onChange={(e) => handleCellChange('note3', e.target.value)} />
      </td>
      <td className='text-center align-middle'>{average !== null ? average.toFixed(2) : ''}</td>
      <td className='text-center align-middle'>
        {average !== null ? (
            <div
              className={`border border-${
                average > 70 ? 'success' : 'danger'
              } text-center align-middle`}
              style={{
                display: 'inline-block',
                color: average > 70 ? 'var(--bs-success)' : 'var(--bs-danger)',
                backgroundColor: average > 70 ? 'var(--bs-light-success)' : 'var(--bs-light-danger)',
                borderRadius: '8px',
                padding: '2px'
              }}
            >
              {average > 70 ? 'APROVADO' : 'REPROVADO'}
            </div>
        ) : (
            ''
        )}
      </td>
    </tr>
  );
};

export default StudentRow;