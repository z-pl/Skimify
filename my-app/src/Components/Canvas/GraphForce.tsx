import React, { useCallback, MouseEvent, useState } from 'react';
import ReactFlow, {
  Background,
  Panel,
  ProOptions,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
  NodeOrigin,
  NodeMouseHandler,
  addEdge,
  OnConnect,
  BackgroundVariant,
  MiniMap,
} from 'reactflow';

import 'reactflow/dist/style.css';

import styles from "../../index.css";

import useForceLayout from './useForceLayout';
import { initialNodes, initialEdges } from './initialElements';

import { Node } from './Node';
import { getSummary } from '../../apis/TextAPI';

const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };

type ExampleProps = {
  strength?: number;
  distance?: number;
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];
const defaultEdgeOptions = { style: { stroke: '#67e8f9', strokeWidth: 3 } };
const emojis = ['random5random5random5random5random5random5random5random5random5random5random5random5'];

const randomEmoji = (): string => {
  return emojis[Math.floor(Math.random() * (emojis.length - 1))];
};

const randomCoordSign = () => {
  return Math.random() > 0.5 ? -1 : 1;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function ReactFlowPro({ strength = -880, distance = 1100 }: ExampleProps = {}) {
  const { project } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodesClickable, setNodesClickable] = useState(true);

  useForceLayout({ strength, distance });
  const createNode = useCallback (async (evt, node) => {
      setNodesClickable(false);
      console.log(nodesClickable);
      const res = await getSummary("");
      const products = res.products;

      onNodeClick(evt, node, ["","",""])
    },
    [nodes.length, setNodes, setEdges]
  )

  const onNodeClick = useCallback(
    (evt, node, nodesToAdd) => {

      const childNodes = [];
      const childEdges = [];

      for (let i = 1; i <= nodesToAdd.length; i++) {
        const childId = `${nodes.length + i}`;
        const childNode = {
          id: childId,
          position: { x: node.position.x + (randomCoordSign() * getRandomInt(100)), y: node.position.y + (randomCoordSign() * getRandomInt(100))},
          data: { label: <Node text={"asdasd"}/>},
          className: "node",
        };
        const childEdge = { id: `${node.id}->${childId}`, source: node.id, target: childId };
        childNodes.push(childNode);
        childEdges.push(childEdge);
      }

      // const childId = `${nodes.length + 1}`;
      // const childNode = {
      //   id: childId,
      //   position: { x: node.position.x + (randomCoordSign() * 50), y: node.position.y + 100},
      //   data: { label: <Node text={"asdasd"}/>},
      //   className: "node",
      // };
      setNodes((nds) => [...nds, ...childNodes]);
      setEdges((eds) => [...eds, ...childEdges]);
      setNodesClickable(true);
      console.log(nodesClickable);
      console.log(nodes);

    },
    [nodes.length, setNodes, setEdges]
  );
  const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={proOptions}
        onConnect={onConnect}
        nodeOrigin={nodeOrigin}
        onNodeClick={ nodesClickable ? createNode : ()=>{}}
        defaultEdgeOptions={defaultEdgeOptions}
        defaultViewport={{ x: window.innerWidth / 2, y: window.innerHeight / 2, zoom: 0 }}
      >
        <MiniMap />
        <Background  variant={BackgroundVariant.Cross} gap={25} />
      </ReactFlow>
  )
}

function ReactFlowWrapper(props: ExampleProps) {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
