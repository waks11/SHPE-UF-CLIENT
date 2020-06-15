import React from "react";
import { Grid, Image, Table } from "semantic-ui-react";
import moment from "moment";

import placeholder from "../assets/images/placeholder.png";

function UserProfile({ user }) {
  if (user) {
    console.log(user);
    console.log(user.classess);
    console.log(user.internships);
    console.log(user.socialMedia);
  }
  return (

    <Grid columns={2} doubling>
      <Grid.Row>
        <Grid.Column>
          {user && user.photo !== "" ? (
            <Image fluid rounded src={user.photo} className="image-profile" />
          ) : (
            <Image fluid rounded src={placeholder} className="image-profile" />
          )}
        </Grid.Column>
        <Grid.Column>
          <div className="table-responsive">
            <Table striped selectable unstackable>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <b>Name:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? (
                      <p>
                        {user.firstName} {user.lastName}
                      </p>
                    ) : (
                      <p>Loading</p>
                    )}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Username:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.username}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Email:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.email}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Major:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.major}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Year:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.year}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Graduating:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.graduating}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Country:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.country}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Ethnicity:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.ethnicity}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Sex:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.sex}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Member Since:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? (
                      <p>
                        {moment(user.createdAt)
                          .local()
                          .format("MM/DD/YYYY")}
                      </p>
                    ) : (
                      <p>Loading</p>
                    )}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Classes:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.classes}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Internships:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.internships}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Social Media:</b>
                  </Table.Cell>
                  <Table.Cell>
                    {user ? <p>{user.socialMedia}</p> : <p>Loading</p>}
                  </Table.Cell>
                </Table.Row>
                {/*<Table.Row>
                  <Table.Cell>
                    <b>Permission:</b>
                  </Table.Cell>
                  <Table.Cell>
                    <span>
                      { user ? <p className="permission_change" >{user.permission}</p> : <p>Loading</p>}
                      <Dropdown
                        button
                        text='Change'
                        className="float_right"
                        onChange={permissionChange}
                        value={value}
                        selection
                        >
                        <Dropdown.Menu>
                          <Dropdown.Item text='Admin' value='admin'/>
                          <Dropdown.Item text='Member' value='member'/>
                          <Dropdown.Item text='Director' value='director'/>
                        </Dropdown.Menu>
                      </Dropdown>
                    </span>
                  </Table.Cell>
                </Table.Row> */}
              </Table.Body>
            </Table>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default UserProfile;
