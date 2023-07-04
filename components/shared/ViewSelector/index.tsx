import { useState } from "react";
import { FaThLarge, FaTh, FaThList } from "react-icons/fa";

export default function ViewSelector({ onChange }: any) {
  const [cardStyle, setCardStyle] = useState("list");

  const handleGridClick = () => {
    setCardStyle("grid");
    onChange("grid");
  };

  const handleLargeClick = () => {
    setCardStyle("large");
    onChange("large");
  };

  const handleListClick = () => {
    setCardStyle("list");
    onChange("list");
  };

  return (
    <div className="flex justify-end gap-3 mt-5">
      <FaThLarge
        className={`cursor-pointer ${cardStyle === "large" && "text-gray-600"}`}
        size={24}
        onClick={handleLargeClick}
      />
      <FaTh
        className={`cursor-pointer ${cardStyle === "grid" && "text-gray-600"}`}
        size={24}
        onClick={handleGridClick}
      />
      <FaThList
        className={`cursor-pointer ${cardStyle === "list" && "text-gray-600"}`}
        size={24}
        onClick={handleListClick}
      />
    </div>
  );
}
