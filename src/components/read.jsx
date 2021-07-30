import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "semantic-ui-react";

function Read() {
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const result = await axios.get(
      "https://6103090679ed680017482420.mockapi.io/fakeData"
    );
    setApiData(result.data);
  };

  const setData = (data) => {
    let { id, firstName, lastName, checkbox } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Checkbox Value", checkbox);
  };

  const getData = async () => {
    const result = await axios.get(
      `https://6103090679ed680017482420.mockapi.io/fakeData`
    );

    setApiData(result.data);
  };

  const onDelete = async (id) => {
    const deleteItem = await axios.delete(
      `https://6103090679ed680017482420.mockapi.io/fakeData/${id}`
    );

    const fetchDataAfterDelete = await getData();

    return deleteItem && fetchDataAfterDelete;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Checked</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {apiData.map((data) => {
            return (
              <Table.Row key={data.id}>
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>{data.lastName}</Table.Cell>
                <Table.Cell>
                  {data.checkbox === true ? "Checked" : "Unchecked"}
                </Table.Cell>

                <Table.Cell>
                  <Link to="/update">
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Read;
