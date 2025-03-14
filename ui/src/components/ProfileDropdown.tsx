import { MoreVertical } from "lucide-react";
import { useState } from "react";
import LogoutBtn from "./LogoutBtn";

function ProfileDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="relative">
      <button
        className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <MoreVertical className="h-5 w-5 text-gray-500" />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          <LogoutBtn />
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
