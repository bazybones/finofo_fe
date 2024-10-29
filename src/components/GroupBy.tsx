import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

interface GroupByProps {
  groupBy: string | null;
  onChangeGroupBy: (groupBy: string | null) => void;
}

const GroupBy: React.FC<GroupByProps> = ({ groupBy, onChangeGroupBy }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="group-by"
        className="block mb-2 text-black dark:text-white"
      >
        Group by:
      </label>
      <Select value={groupBy || "None"} onValueChange={onChangeGroupBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="None" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="None">None</SelectItem>
          <SelectItem value="Family">Family</SelectItem>
          <SelectItem value="Order">Order</SelectItem>
          <SelectItem value="Genus">Genus</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default GroupBy;
