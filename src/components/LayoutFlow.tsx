import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Panel,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import Dagre from "@dagrejs/dagre";
import EntityNode from "./EntityNode";
import { JSONSchema, baseUrl } from "./SchemaBuilder";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";

const nodeTypes = {
  entity: EntityNode,
};

// export const initialEdges = [
//   { id: "e12", source: "1", target: "2", animated: true },
//   { id: "e13", source: "1", target: "3", animated: true },
// ];

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, options) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

export interface LayoutFlowProps {
  schema: JSONSchema;
}

const createCac = async () => {
  const res = await fetch(`${baseUrl}/cac`, {
    method: "POST",
    body: JSON.stringify({
      prompt,
    }),
  });
  return await res.json();
};

const LayoutFlow = ({ schema }: LayoutFlowProps) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const initialNodes = schema.tables.map((table, idx) => {
      return {
        id: table.name,
        type: "entity",
        position: { x: 0, y: idx * 450 },
        data: {
          entityName: table.name,
          fields: table.columns.map((column) => {
            return {
              name: column.name,
              type: column.type,
            };
          }),
        },
      };
    });
    setNodes((nds) => initialNodes);

    const initialEdges = schema.tables
      .filter((table) => table.foreign_keys)
      .flatMap((table) => {
        return table.foreign_keys?.map((fk) => {
          return {
            id: `e${fk.name}`,
            source: table.name,
            target: fk.references.table,
            animated: true,
          };
        });
      });
    setEdges((eds) => initialEdges);
    // setEdges((eds) => initialEdges);
  }, []);

  // useEffect(() => {
  //   if (nodes.length && edges.length) {
  //     onLayout("LR");
  //   }
  // }, [edges]);

  const onLayout = useCallback(
    (direction) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );

  // Mutations
  const mutation = useMutation({
    mutationFn: createCac,
  });

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Panel
          style={{
            borderRadius: "9999px",
            backgroundColor: "#4f46e5",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            fontSize: "0.75rem",
            fontWeight: "600",
            color: "#fff",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            cursor: "pointer",
          }}
          position="top-right"
          onClick={openModal}
        >
          Create Schema
        </Panel>
        <Transition appear show={isOpen}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Warning
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to create a new schema? This will
                        add resources to your Yext account.
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Submit
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </ReactFlow>
    </>
  );
};

export default LayoutFlow;
