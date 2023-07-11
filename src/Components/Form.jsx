import React, { useState, useEffect } from "react";
import { Dropdown, Table } from "semantic-ui-react";
import axios from "axios";
import "./Form.css";

const countryOptions = [
  { key: "ad", value: "ad", flag: "ad", text: "Andorra" },
  { key: "al", value: "al", flag: "al", text: "Albania" },
  { key: "ar", value: "ar", flag: "ar", text: "Argentina" },
  { key: "at", value: "at", flag: "at", text: "Austria" },
  { key: "au", value: "au", flag: "au", text: "Australia" },
  { key: "ax", value: "ax", flag: "ax", text: "Aland islands" },
  { key: "bb", value: "bb", flag: "bb", text: "Barbados" },
  { key: "be", value: "be", flag: "be", text: "Belgium" },
  { key: "bg", value: "bg", flag: "bg", text: "Bulgaria" },
  { key: "gb", value: "gb", flag: "gb", text: "United Kingdom" },
  { key: "us", value: "us", flag: "us", text: "United States" },
];

const HolidayForm = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    if (selectedCountry) {
      fetchHolidays(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchHolidays = async (countryCode) => {
    try {
      const response = await axios.get(
        `https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`
      );
      setHolidays(response.data);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const handleCountryChange = (event, { value }) => {
    setSelectedCountry(value);
  };

  return (
    <>
      <label className="middle">Enter the country</label>
      <Dropdown
        className="middle"
        style={{ width: 240 }}
        placeholder="Select Country"
        fluid
        search
        selection
        options={countryOptions}
        onChange={handleCountryChange}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {holidays.map((holiday) => (
            <Table.Row key={holiday.date}>
              <Table.Cell>{holiday.date}</Table.Cell>
              <Table.Cell>{holiday.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default HolidayForm;
