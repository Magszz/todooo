import { Link } from "react-router";

interface OptionProps {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const Option = ({ name, path, icon }: OptionProps) => {
  return (
    <Link to={path}>
      <div className="sidebar__options-item">
        {icon}
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default Option;
