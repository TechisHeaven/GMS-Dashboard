import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown: React.FC = () => {
  const [showMulti, setShowMulti] = useState(false);
  const [showDouble, setShowDouble] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMulti(false);
        setShowDouble(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setShowMulti((prev) => !prev)}
        className=" focus:outline-none font-medium rounded-lg text-sm px-4 p-2 text-center inline-flex items-center"
        type="button"
      >
        <p className="max-w-32 truncate">Orange Grocery</p>
        <ChevronDown />
      </button>

      {showMulti && (
        <div className="absolute mt-2 z-50 border border-gray-50 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 ">
          <ul className="py-2 text-sm text-gray-700 ">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Grocery Store 1
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                Grocery Store 2
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
