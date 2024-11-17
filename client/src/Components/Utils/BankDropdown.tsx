import React, { useState } from "react";
import { useField } from "formik";
import AuthInput from "../Input/AuthInput";
import { AiOutlineBank } from "react-icons/ai";
import banks from "../../Jsons/Banks.json";
import ClickOutside from "./ClickOutside";

interface Bank {
  id: number;
  name: string;
}

interface BankDropdownProps {
  name: string;
  label: string;
  banks: Bank[];
  required?: boolean;
}

const BankDropdown: React.FC<BankDropdownProps> = ({
  name,
  label,
  //   banks,
  required = false,
}) => {
  const [field, , helpers] = useField(name); // Formik field management
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (bank: Bank) => {
    helpers.setValue(bank.name); // Set Formik field value
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
          icon={<AiOutlineBank />}
          placeholder="Select a bank"
          required={required}
          value={field.value} // Bind Formik value
          onClick={() => setIsOpen(!isOpen)} // Open dropdown on click
          readOnly
          prefix=""
        />

        {/* Dropdown Modal */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
            {/* Search Input */}
            <div className="p-2">
              <input
                type="text"
                className="w-full px-2 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search banks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Banks List */}
            <ul className="max-h-[140px] overflow-y-auto">
              {filteredBanks.length > 0 ? (
                filteredBanks.map((bank) => (
                  <li
                    key={bank.id}
                    className="px-3 py-1.5 cursor-pointer hover:bg-gray-100 text-xs font-base text-gray-500"
                    onClick={() => handleSelect(bank)}
                  >
                    {bank.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-xs text-gray-500">
                  No banks found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default BankDropdown;
