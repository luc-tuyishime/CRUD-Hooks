import React, { useState, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";

function Update() {
  const [id, setID] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const updateAPIData = () => {
    axios.put(`https://6103090679ed680017482420.mockapi.io/fakeData/${id}`, {
      firstName,
      lastName,
      checkbox,
    });
  };

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setCheckbox(localStorage.getItem("Checkbox Value"));
  }, []);

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            checked={checkbox}
            label="I agree to the Terms and Conditions"
            onChange={() => setCheckbox(!checkbox)}
          />
        </Form.Field>
        <Button onClick={updateAPIData} type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export default Update;
