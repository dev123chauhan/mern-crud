import  { useEffect, useState } from 'react';
import axios from "axios";
import { MdEdit, MdRestoreFromTrash } from "react-icons/md";
import Swal from 'sweetalert2';
import Formtable from './components/Formtable';

axios.defaults.baseURL = "https://mern-crud-server-rho.vercel.app/api";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "other", // Set a default value
    hobbies: ""
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "other", // Set a default value
    hobbies: "",
    _id: ""
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/create", formData);
      if (data.success) {
        setAddSection(false);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message,
        });
        getFetchData();
        setFormData({
          name: "",
          email: "",
          mobile: "",
          gender: "other",
          hobbies: ""
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while submitting the form.',
      });
      console.log(error)
    }
  };

  const getFetchData = async () => {
    try {
      const { data } = await axios.get("/");
      if (data.success) {
        setDataList(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/delete/${id}`);
      if (data.success) {
        getFetchData();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the item.',
      });
      console.log(error)
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/update", formDataEdit);
      if (data.success) {
        getFetchData();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message,
        });
        setEditSection(false);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the item.',
      });
      console.log(error)
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  return (
    <div className="container">
      <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>

      {addSection && (
        <Formtable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddSection(false)}
          rest={formData}
        />
      )}

      {editSection && (
        <Formtable
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          handleclose={() => setEditSection(false)}
          rest={formDataEdit}
        />
      )}

      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Hobbies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>{el.gender}</td>
                  <td>{el.hobbies}</td>
                  <td>
                    <button className='btn btn-edit' onClick={() => handleEdit(el)}><MdEdit /></button>
                    <button className='btn btn-delete' onClick={() => handleDelete(el._id)}><MdRestoreFromTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;