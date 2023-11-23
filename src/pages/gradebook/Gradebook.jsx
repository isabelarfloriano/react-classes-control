import React, { useState } from 'react';
import StudentRow from './StudentRow';

const Gradebook = () => {
  const [students, setStudents] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const textData = e.target.result;
      const parsedData = parseTextData(textData);

      setStudents(parsedData);
    };

    reader.readAsText(file);
  };

  const parseTextData = (textData) => {
    const names = textData.split('\n');
    
    return names.map((name, index) => ({
      id: index + 1,
      name: name.trim(),
      note1: 0,
      note2: 0,
      note3: 0,
      average: 0,
      approved: false,
    }));
  };

  const handleCellChange = (id, column, value) => {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.map((student) => {
        if (student.id === id) {
          return { ...student, [column]: value };
        }
        return student;
      });
      return updatedStudents;
    });
  };

  return (
    <div className="App container mt-4">
      <div className="bg-dark text-white p-3 rounded">
        <label className="font-weight-bold" htmlFor="fileInput">Upload da lista com os nomes dos alunos:</label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileUpload}
          accept=".txt"
          className="form-control bg-white text-dark border-dark rounded"
        />
      </div>
      <div className="table-responsive">
        <table className="table mt-3 table-striped table-dark">
          <thead>
            <tr>
              <th scope="col" className='mx-auto align-middle text-center'>Número de Matrícula</th>
              <th scope="col" className='mx-auto align-middle text-center'>Nome</th>
              <th scope="col" className='mx-auto align-middle text-center'>Prova 1</th>
              <th scope="col" className='mx-auto align-middle text-center'>Prova 2</th>
              <th scope="col" className='mx-auto align-middle text-center'>Nota de Avaliações</th>
              <th scope="col" className='mx-auto align-middle text-center'>Média</th>
              <th scope="col" className='mx-auto align-middle text-center'>Status de Aprovação</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentRow key={student.id} student={student} onCellChange={handleCellChange} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Gradebook;