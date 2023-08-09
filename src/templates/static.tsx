import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
} from "@yext/pages";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Entity from "../components/Entity";

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

const Static: Template<TemplateRenderProps> = () => {
  const constraintsRef = useRef(null);
  const [entityTypes, setEntityTypes] = useState<
    {
      id: string;
      initialX: number;
      initialY: number;
    }[]
  >([{ id: "A", initialX: 0, initialY: 0 }]);

  const addNewEntities = () => {
    // determine the new entities position based on existing ones
    const newPosition = calculateNewPosition();

    // add new entities at the calculated position
    setEntityTypes((prev) => [
      ...prev,
      { id: "B", initialX: newPosition.x, initialY: newPosition.y },
    ]);
  };

  const calculateNewPosition = () => {
    // TODO: implement a method to calculate the new position based on existing entities

    // For now we just return a fixed position
    return { x: 0, y: 0 };
  };
  return (
    <div ref={constraintsRef} className="h-screen w-screen flex bg-stone-200 ">
      <div>
        {entityTypes.map((entityType, idx) => (
          <motion.div
            key={idx}
            drag
            initial={{
              x: entityType.initialX,
              y: entityType.initialY,
              translateX: idx * -176,
              // translateY: id,
            }}
            className="rounded-3xl bg-white w-96 flex flex-col shadow-2xl"
            dragConstraints={constraintsRef}
            dragMomentum={false}
          >
            <button className="text-white text-2xl" onClick={addNewEntities}>
              X
            </button>
            <Entity />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Static;
