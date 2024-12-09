import React from "react";

interface CountrySelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  label: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  name,
  label,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-semibold">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        required
      >
        <option value="">Select Country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="England">England</option>
        <option value="China">China</option>
        <option value="Russia">Russia</option>
        <option value="Canada">Canada</option>
      </select>
    </div>
  );
};

export default CountrySelect;
