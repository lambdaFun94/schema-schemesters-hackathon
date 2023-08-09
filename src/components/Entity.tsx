import * as React from "react";
import Table from "./Table";
import { YextField, YextCustomFieldProperty } from "../types/yext";

// import { YextCustomFieldProperty, YextField } from "../types/yext";

const primitives = ["string", "boolean", "image", "unknown", "decimal"];

export const getYextFieldType = (
  customField: YextCustomFieldProperty | YextField
): string => {
  if (customField.typeId === "list") {
    if (customField.type && customField.type.listType) {
      if (!primitives.includes(customField.type.listType.typeId)) {
        return `List of ${customField.type.listType.typeId}`;
      } else {
        return `List of ${getYextFieldType(
          customField.type.listType as YextField
        )}`;
      }
    } else {
      return "Unknown";
    }
  }

  if (!primitives.includes(customField.typeId)) {
    return customField.typeId;
  }

  if (customField.type) {
    const field = customField.type;
    if (field.stringType) {
      if (field.stringType.stereotype === "SIMPLE") {
        return "Single-line Text";
      }
      if (field.stringType.stereotype === "MULTILINE") {
        return "Multi-line Text";
      } else {
        return "URL";
      }
    }
    if (field.booleanType) {
      return "Boolean";
    }
    if (field.decimalType) {
      return "Number";
    }
    if (field.imageType) {
      return "Complex Image";
    }
    if (field.structType) {
      return "struct";
    }
  }

  return "Unknown";
};

const fields: YextField[] = [
  {
    inputId: "customerId",
    displayName: "Customer ID",
    $id: "customerId",
    typeId: "text",
    type: {
      stringType: {
        stereotype: "SIMPLE",
      },
    },
  },
  {
    inputId: "customerName",
    displayName: "Customer Name",
    $id: "customerName",
    typeId: "text",
    type: {
      stringType: {
        stereotype: "SIMPLE",
      },
    },
  },
  {
    inputId: "customerEmail",
    displayName: "Customer Email",
    $id: "customerEmail",
    typeId: "text",
    type: {
      stringType: {
        stereotype: "SIMPLE",
      },
    },
  },
];

const renderRow = (field: YextField, fieldIdx: number) => {
  return (
    <tr
      key={field.displayName}
      className={fieldIdx % 2 === 0 ? undefined : "bg-gray-50"}
    >
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
        {field.displayName}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {field.$id}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {getYextFieldType(field)}
      </td>
    </tr>
  );
};

export default function Entity() {
  return (
    <div className="flex flex-col px-4">
      <h2>Customers</h2>
      <div className=" overflow-y-scroll">
        <div className="mt-2 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2">
              <Table<YextField>
                columnNames={["Field Name", "Field Id", "Field Type"]}
                rowData={fields}
                renderRow={renderRow}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
