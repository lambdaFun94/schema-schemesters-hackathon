import * as React from "react";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import Dagre from "@dagrejs/dagre";
import EntityNode from "./EntityNode";
import { JSONSchema } from "./SchemaBuilder";

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

const LayoutFlow = ({ schema }: LayoutFlowProps) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const initialNodes = Object.keys(schema.properties).map((entityName) => {
      return {
        id: "1",
        type: "entity",
        data: {
          entityName: "Entity Name",
          fields: Object.entries(schema.properties).map(
            ([fieldName, field]) => {
              return {
                name: fieldName,
                type: field.type,
              };
            }
          ),
        },
        position: { x: 0, y: 0 },
      };
    });
    setNodes((nds) => initialNodes);
    // setEdges((eds) => initialEdges);
  }, []);

  useEffect(() => {
    if (nodes.length && edges.length) {
      onLayout("LR");
    }
  }, [edges]);

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

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
    ></ReactFlow>
  );
};

export default LayoutFlow;
