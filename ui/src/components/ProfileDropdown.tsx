import LogoutBtn from "./LogoutBtn";

function ProfileDropdown() {
  return (
    <div className="dropdown relative inline-flex">
      <button
        className="dropdown-toggle btn btn-text btn-primary btn-circle"
        id="dropdown-default"
        type="button"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Dropdown"
      >
        <span className="icon-[tabler--dots-vertical] size-5"></span>
      </button>
      <ul
        className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-default"
      >
        <LogoutBtn />
      </ul>
    </div>
  );
}

export default ProfileDropdown;
