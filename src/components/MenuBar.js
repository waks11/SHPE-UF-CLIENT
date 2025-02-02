import React, { useContext } from "react";
import {
  Menu,
  Container,
  Dropdown,
  Button,
  Icon
} from "semantic-ui-react";
import { Media } from "../Media";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

const logo = "https://shpeuf.s3.amazonaws.com/public/misc/logo.png";

function MenuBar({permission}) {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <Media greaterThanOrEqual="computer">
        <Menu inverted>
          <Container>
            <Menu.Item className="brand-logo" as={Link} to="/">
              <img src={logo} alt="" />
            </Menu.Item>
            <Menu.Item as={Link} to="/about">
              About
            </Menu.Item>
            <Menu.Item as={Link} to="/alumni">
              Alumni
            </Menu.Item>
            <Menu.Item as={Link} to="/eboard">
              E-Board
            </Menu.Item>
            <Menu.Item as={Link} to="/devteam">
              Dev Team
            </Menu.Item>
            <Menu.Item as={Link} to="/sponsors">
              Sponsors
            </Menu.Item>
            <Menu.Item as={Link} to="/calendar">
              Calendar
            </Menu.Item>
            <Menu.Item as={Link} to="/resources">
              Resources
            </Menu.Item>            
            <Menu.Item as={Link} to="/contactus">
              Contact Us
            </Menu.Item>
           {/* <Menu.Item as={Link} to="/shpejr">
              SHPE Jr
             </Menu.Item> */} 

            <Menu.Menu position="left">
              {user ? (
                <>
                  <Dropdown pointing item className="email" text={user.email}>
                    <Dropdown.Menu>
                      {permission.includes('admin') &&
                      <Dropdown.Item as={Link} to="/admin">
                        Admin Panel
                      </Dropdown.Item>
                      }
                      <Dropdown.Item as={Link} to="/profile">
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/points">
                        Points Program
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/corporations">
                        Corporate Database
                      </Dropdown.Item>
                      {/*<Dropdown.Item as={Link} to="/mentorshpe">
                        MentorSHPE
                    </Dropdown.Item>*/}
                      <Dropdown.Item as={Link} to="/shpeitonetwork">
                        SHPEito Network
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/shperentals">
                        SHPE Rentals
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/alumnidirectory">
                        Alumni Directory
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/reimbursementrequest">
                        Reimbursements
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={logout}>
                        <p className="logout">Logout</p>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Menu.Item>
                  <Button
                    content="Members"
                    icon="user"
                    labelPosition="left"
                    as={Link}
                    to="/login"
                  />
                </Menu.Item>
              )}
            </Menu.Menu>
          </Container>
        </Menu>
      </Media>

      <Media lessThan="computer">
        <Menu inverted>
          <Container>
                <Dropdown
                  pointing
                  item
                  text="Menu"
                  className="brand-logo"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item className="brand-logo" as={Link} to="/">
                      Home
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/about">
                      About Us
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/alumni">
                      Alumni
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/eboard">
                      E-Board
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/devteam">
                      Dev Team
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/sponsors">
                      Sponsors
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/calendar">
                      Calendar
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/contactus">
                      Contact Us
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/resources">
                      Resources
                    </Dropdown.Item>
                   {/* <Dropdown.Item as={Link} to="/shpejr">
                      SHPE JR
              </Dropdown.Item> */}
                  </Dropdown.Menu>
                </Dropdown>

            <Menu.Menu position="right">
              {user ? (
                <>
                  <Dropdown
                    pointing
                    item
                    className="email"
                    text={user.email}
                  >
                    <Dropdown.Menu>
                      {permission.includes('admin') &&
                      <Dropdown.Item as={Link} to="/admin">
                        Admin Panel
                      </Dropdown.Item>
                      }
                      <Dropdown.Item as={Link} to="/profile">
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/points">
                        Points Program
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/corporations">
                        Corporate Database
                      </Dropdown.Item>
                      {/*<Dropdown.Item as={Link} to="/mentorshpe">
                        MentorSHPE
                    </Dropdown.Item>*/}
                      <Dropdown.Item as={Link} to="/shpeitonetwork">
                        SHPEito Network
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/shperentals">
                        SHPE Rentals
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/alumnidirectory">
                        Alumni Directory
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/reimbursementrequest">
                        Reimbursements
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={logout}>
                        <p className="logout">Logout</p>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <Menu.Item>
                  <Button icon as={Link} to="/login">
                    <Icon name="sign-in" />
                  </Button>
                </Menu.Item>
              )}
            </Menu.Menu>
          </Container>
        </Menu>
      </Media>
    </>
  );
}

export default MenuBar;