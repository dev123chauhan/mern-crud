// import React from "react";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}>
          <MdClose />
        </div>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleOnChange}
          value={rest.name}
        />

        <label htmlFor="email">Email : </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleOnChange}
          value={rest.email}
        />

        <label htmlFor="mobile">Mobile : </label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          onChange={handleOnChange}
          value={rest.mobile}
        />

        <div style={{display:"flex", marginBottom:"10px"}}>
          <label>Gender:</label>
          <div>
            <label>
              <input type="radio" name="gender" value="male" checked={rest.gender === 'male'} onChange={handleOnChange} />
              Male
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="gender" value="female" checked={rest.gender === 'female'} onChange={handleOnChange} />
              Female
            </label>
          </div>
          <div>
            <label>
              <input type="radio" name="gender" value="other" checked={rest.gender === 'other'} onChange={handleOnChange} />
              Other
            </label>
          </div>
        </div>

        <label htmlFor="hobbies">Hobbies</label>
        <input
          type="text"
          id="hobbies"
          name="hobbies"
          onChange={handleOnChange}
          value={rest.hobbies}
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

Formtable.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleclose: PropTypes.func.isRequired,
  rest: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    gender: PropTypes.oneOf(['male', 'female', 'other']).isRequired,
    hobbies: PropTypes.string.isRequired,
  }).isRequired,
};

export default Formtable;