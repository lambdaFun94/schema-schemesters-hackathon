import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
} from "@yext/pages";
import { MiniMap, Controls, ReactFlowProvider } from "reactflow";

import "reactflow/dist/style.css";
import LayoutFlow from "../components/LayoutFlow";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SchemaBuilder from "../components/SchemaBuilder";

/**
 * Defines the path that the generated file will live at for production.
 */
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Static Page Example",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      },
    ],
  };
};

const queryClient = new QueryClient();

const Static: Template<TemplateRenderProps> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-screen">
        <SchemaBuilder />
      </div>
    </QueryClientProvider>
  );
};

export default Static;
