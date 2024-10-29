import React, { ReactNode } from "react";

interface ListProps {
  children: ReactNode;
}

const List: React.FC<ListProps> = ({ children }) => {
  return (
    <ul className="divide-y divide-gray-200 rounded-md border border-gray-300">
      {children}
    </ul>
  );
};

export default List;
