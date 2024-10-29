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
    <div className="mb-4 flex justify-center items-center flex-col">
      <label
        htmlFor="group-by"
        className="text-xl font-semibold inline-block text-center mb-2 text-black dark:text-white"
      >
        Group by:
      </label>
      <Select value={groupBy || "None"} onValueChange={onChangeGroupBy}>
        <SelectTrigger aria-label="Group" className="w-[180px]">
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
