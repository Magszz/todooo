import "./navbar.css";
import { Bell } from "lucide-react";
import { useNavbar } from "./navbar.viewmodel";

const Navbar = () => {
  const { currentPage } = useNavbar();

  return (
    <div className="navbar">
      <p className="navbar__page-title">{currentPage}</p>
      <div className="navbar__options">
        <Bell size={20} />

        <div className="navbar__user-profile">
          <img
            src="https://thefincheranalyst.com/wp-content/uploads/2018/07/1995-seven-john-doe.jpg?w=800"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
