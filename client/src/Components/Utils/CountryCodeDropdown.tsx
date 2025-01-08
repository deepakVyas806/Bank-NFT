import React, { useState } from "react";
import { useField } from "formik";
import AuthInput from "../Input/AuthInput";
import { AiOutlineMobile } from "react-icons/ai";
import countryCodes from "../../Jsons/CountryCode.json";
import ClickOutside from "./ClickOutside";

interface CountryCode {
  code: string;
  name: string;
}

interface CountryCodeDropdownProps {
  name: string;
  label: string;
  // CountryCodes: CountryCode[];
  required?: boolean;
}

const CountryCodeDropdown: React.FC<CountryCodeDropdownProps> = ({
  name,
  label,
  //   banks,
  required = false,
}) => {
  const [field, , helpers] = useField(name); // Formik field management
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBanks = countryCodes.filter((countrycode) =>
    countrycode.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (countrycode: CountryCode) => {
    helpers.setValue(countrycode.code); // Set Formik field value
    setIsOpen(false);
  };

  return (
    <ClickOutside onClickOutside={() => setIsOpen(false)}>
      <div className="relative w-full">
        {/* Input Display with AuthInput */}
        <AuthInput
          label={label}
          name={name}
          type="text"
          icon={<AiOutlineMobile />}
          // placeholder="Select a country code"
          required={required}
          value={field.value} // Bind Formik value
          onClick={() => setIsOpen(!isOpen)} // Open dropdown on click
          readOnly
          prefix=""
        />

        {/* Dropdown Modal */}
        {isOpen && (
          <div className="absolute z-10 w-[40vh] mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
            {/* Search Input */}
            <div className="p-2">
              <input
                type="text"
                className="w-full px-2 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search country code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Banks List */}
            <ul className="max-h-[140px] overflow-y-auto">
              {filteredBanks.length > 0 ? (
                filteredBanks.map((country) => (
                  <li
                    key={country.name}
                    className="px-3 py-1.5 cursor-pointer hover:bg-gray-100 text-xs font-base text-gray-500"
                    onClick={() => handleSelect(country)}
                  >
                    {country.name} ({country.code})
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-xs text-gray-500">
                  No data found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default CountryCodeDropdown;
