import React, { useState } from "react";
import { Dropdown, Menu } from "semantic-ui-react";

function DropdownMenu() {
  var [title, setTitle] = useState("Major");
  var [options, setOptions] = useState([
    { text: "Computer Science" },
    { text: "Computer Engineering" },
    { text: "Digital Arts and Sciences" },
    { text: "Biomedical Engineering" }
  ]);
  var searchTitle = "Search " + title;
  
  return (
    <Menu secondary>
      <Menu.Item>
        <Dropdown item text={title}>
          <Dropdown.Menu>
            <Dropdown.Item
              text="Major"
              onClick={() => {
                setTitle((title = "Major"));
                setOptions([
                  { text: "Computer Science" },
                  { text: "Computer Engineering" },
                  { text: "Digital Arts and Sciences" },
                  { text: "Biomedical Engineering" }
                ]);
              }}
            />
            <Dropdown.Item
              text="Year"
              onClick={() => {
                setTitle((title = "Year"));
                setOptions([
                  { text: "1st Year" },
                  { text: "2nd Year" }]);
              }}
            />
            <Dropdown.Item
              text="Country of Origin"
              onClick={() => {
                setTitle((title = "Country of Origin"));
                setOptions([
                  { text: "Cuba" },
                  { text: "Venezuela" }]);
              }}
            />
            <Dropdown.Item
              text="Sex"
              onClick={() => {
                setTitle((title = "Sex"));
                setOptions([
                  { text: "Female" }, 
                  { text: "Male" }]);
              }}
            />
            <Dropdown.Item
              text="Ethnicity"
              onClick={() => {
                setTitle((title = "Ethnicity"));
                setOptions([
                  { text: "Hispanic/Latino" }]);
              }}
            />
            <Dropdown.Item
              text="Class Sharing"
              onClick={() => {
                setTitle((title = "Class Sharing"));
                setOptions([
                  { text: "COP4600" }]);
              }}
            />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <Dropdown
            placeholder={searchTitle}
            item
            search
            options={options}
            onClick={() => console.log("SET FILTER")}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default DropdownMenu;
