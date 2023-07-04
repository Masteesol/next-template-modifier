import Link from "next/link";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface Breadcrumb {
  name: string;
  url: string | null;
}

interface BreadcrumbsProps {
  paths: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
  return (
    <nav>
      <ul className="flex gap-1">
        {paths.map((path, index) => (
          <li key={index} className="flex flex-row items-center gap-2">
            {path.url ? (
              <Link href={path.url}>
                <button>{path.name}</button>
              </Link>
            ) : (
              <span>{path.name}</span>
            )}
            {index < paths.length - 1 && <span className="text-gray-500"><FaChevronRight /></span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
