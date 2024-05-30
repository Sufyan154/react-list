import { Data } from "./detail";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setData(Data);
  }, []);

  // for edit
  const handleEdit = (id) => {
    setUpdate(true);
    const dt = data.find(item => item.id === id);
    if (dt !== undefined) {
      setId(id);
      setFirstname(dt.firstName);
      setLastname(dt.lastName);
      setAge(dt.age);
    }
  };

  // for delete
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this record?")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }
    }
  };

  // for save
  const handleSave = (e) => {
    e.preventDefault();
    let error = '';
    if (firstName === '')
      error += "First name is required. ";
    if (lastName === '')
      error += "Last name is required. ";
    if (age <= 0)
      error += "Age is required. ";
    if (error === '') {
      alert("Record Saved");
      const dt = [...data];
      const newObject = {
        id: dt.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age
      };
      dt.push(newObject);
      setData(dt);
    } else {
      alert(`Error: ${error}`);
    }
  };

  // for clear
  const handleClear = () => {
    setAge(0);
    setFirstname('');
    setLastname('');
    setAge('');
    setUpdate(false);
  };

  // for update
  const handleUpdate = () => {
    const index = data.findIndex((item) => item.id === id);
    if (index !== -1) {
      const dt = [...data];
      dt[index].firstName = firstName;
      dt[index].lastName = lastName;
      dt[index].age = age;
      setData(dt);
      handleClear();
    }
  };

  // connect with JSX
  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: "center", marginTop: "15px", marginBottom: "20px" }} >
        <div>
          <label>First Name
            <input type='text' placeholder="Enter your first Name" onChange={(e) => setFirstname(e.target.value)} value={firstName} />
          </label>
        </div>

        <div>
          <label>Last Name
            <input type='text' placeholder="Enter your Last Name" onChange={(e) => setLastname(e.target.value)} value={lastName} />
          </label>
        </div>

        <div>
          <label> Age
            <input type='number' placeholder="Enter your Age" onChange={(e) => setAge(e.target.value)} value={age} />
          </label>
        </div>

        <div>
          {/* logic update save btn */}
          {!update ?
            <button className="btn btn-primary" onClick={(e) => handleSave(e)}>Save </button> :
            <button className="btn btn-primary" onClick={() => handleUpdate()}>Update </button>
          }
          <button className="btn btn-danger " onClick={() => handleClear()}>Clear</button>
        </div>

      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <td>sr.no</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {/* data show */}
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit </button> &nbsp;
                <button className="btn btn-danger " onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
