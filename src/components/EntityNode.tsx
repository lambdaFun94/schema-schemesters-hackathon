import * as React from "react";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import Table from "./Table";
import { motion } from "framer-motion";

const renderRow = (
  field: { name: string; type: string; description: string },
  fieldIdx: number
) => {
  return (
    <tr
      key={field.name}
      className={fieldIdx % 2 === 0 ? undefined : "bg-gray-50"}
    >
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
        {field.name}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {field.type}
      </td>
    </tr>
  );
};

interface EntityNodeProps {
  entityName: string;
  fields: { name: string; type: string; description?: string }[];
}

function EntityNode({ data }) {
  const { entityName, fields } = data as EntityNodeProps;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 w-70 overflow-y-auto">
        <div className="flex flex-col px-4 ">
          <h2>{entityName}</h2>
          <div className=" overflow-y-scroll">
            <div className="mt-2 flow-root">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 ">
                  <Table<{ name: string; type: string }>
                    columnNames={["Field Name", "Field Type"]}
                    rowData={fields}
                    renderRow={renderRow}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Handle
          type="target"
          position={Position.Top}
          className="w-16 !bg-teal-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-16 !bg-teal-500"
        />
      </div>
    </motion.div>
  );
}

export default memo(EntityNode);
