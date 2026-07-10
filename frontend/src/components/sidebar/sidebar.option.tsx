import { Link } from "react-router";

interface OptionProps {
  name: string;
  path?: string;
  action?: () => void;
  icon: React.ReactNode;
}

const Option = ({ name, path, icon, action }: OptionProps) => {
  return path ? (
    <Link to={path}>
      <div className="sidebar__options-item">
        {icon}
        <p>{name}</p>
      </div>
    </Link>
  ) : (
    <div onClick={action} className="sidebar__options-item">
      {icon}
      <p>{name}</p>
    </div>
  );
};

export default Option;
