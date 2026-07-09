import "./sidebar.css";
import Logo from "@/assets/todooo.webp";
import { useSidebar } from "./sidebar.viewmodel";
import Option from "./sidebar.option";

const Sidebar = () => {
  const { options, options2 } = useSidebar();

  return (
    <div className="sidebar">
      <div>
        <div className="sidebar-logo">
          <img src={Logo} alt="Todooo Logo" />
        </div>

        <div className="sidebar__options">
          {options?.map((option, ind) => (
            <Option key={`${option.name}-${ind}`} {...option} />
          ))}
        </div>
      </div>

      <div>
        <div className="sidebar__options">
          {options2?.map((option, ind) => (
            <Option key={`${option.name}-${ind}`} {...option} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
