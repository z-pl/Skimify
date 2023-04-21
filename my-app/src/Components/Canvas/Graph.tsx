import React, { useCallback } from "react";
import ReactFlow, {
  MiniMap,
  BackgroundVariant,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge
} from "reactflow";

import 'reactflow/dist/style.css';
const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" }},
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export function Graph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

 const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  function createNodes() {
    let newNode = { id: "3", position: { x: 0, y: 150 }, data: { label: "3" }}

    setNodes((nodes) => {
      return [...nodes, newNode]
    })

    addNewEdge();

  }
  function addNewEdge() {
    let newedge = { id: "e2-3", source: "2", target: "3" }

    setEdges(edges => [...edges, newedge])
  }
  return (
    <div className="w-screen h-screen">
      <button onClick={createNodes}>Add NOde</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        >
          <Background variant={BackgroundVariant.Lines} gap={25}/>
      </ReactFlow>
    </div>
  )
}
