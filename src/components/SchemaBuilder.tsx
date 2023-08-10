import * as React from "react";
import { Controls, MiniMap, ReactFlowProvider } from "reactflow";
import LayoutFlow from "./LayoutFlow";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { GridLoader } from "react-spinners";

const baseUrl = "https://7knfl6mzoc-81463-d.preview.pagescdn.com/api";

export type JSONSchema = {
  properties: Record<string, Property>;
  required?: string[];
};

type Property = {
  type: "integer" | "string" | "number" | "array" | "object";
  description: string;
  items?: Items;
  properties?: Record<string, Property>;
};

type Items = {
  type: "integer" | "string" | "number" | "array" | "object";
  description?: string;
  properties?: Record<string, Property>;
};

const generateSchema = async (prompt: string): Promise<JSONSchema> => {
  const res = await fetch(`${baseUrl}/json`, {
    method: "POST",
    body: JSON.stringify({
      prompt,
    }),
  });
  return await res.json();
};

export default function SchemaBuilder() {
  const [businessType, setBusinessType] = useState<string>("");
  const [schema, setSchema] = useState<JSONSchema>();

  // Mutations
  const mutation = useMutation({
    mutationFn: generateSchema,
    onSuccess: (data) => {
      setSchema(data);
    },
  });

  return schema ? (
    <ReactFlowProvider>
      <LayoutFlow schema={schema} />
      <MiniMap />
      <Controls />
    </ReactFlowProvider>
  ) : (
    <div className="flex justify-center items-center h-full w-full">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {mutation.isLoading
              ? "Generating Schema"
              : "What Type of Business do you have?"}
          </h3>
          {mutation.isLoading ? (
            <div className="flex justify-center ">
              <GridLoader color="#4f46e5" />
            </div>
          ) : (
            <>
              <>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="you@example.com"
                    onChange={(e) => setBusinessType(e.target.value)}
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={() =>
                      mutation.mutate(`Generate a schema for a ${businessType}`)
                    }
                  >
                    Generate Schema
                  </button>
                </div>
              </>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
