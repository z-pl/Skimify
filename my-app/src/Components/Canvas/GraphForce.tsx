import React, { useCallback, MouseEvent, useState } from 'react';
import { flushSync } from 'react-dom';
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

import textAreaStore from "../../mobx/stores/UserInputText";
import canvasStore from '../../mobx/stores/CanvasStore';
import { CSSProperties } from 'react';
import { observer } from "mobx-react-lite";
import {Node} from 'reactflow';
import 'reactflow/dist/style.css';

import useForceLayout from './useForceLayout';
import { initialNodes, initialEdges } from './initialElements';

import SkimifyNode  from './SkimifyNode';
import { getSummary, getDotPoints } from '../../apis/TextAPI';
import RestartCanvas from './RestartCanvas';

const proOptions: ProOptions = { account: 'paid-pro', hideAttribution: true };

interface SummaryResponse {
	dotpoints: string;
}

type ExampleProps = {
  strength?: number;
  distance?: number;
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];
const defaultEdgeOptions = { style: { stroke: '#09090b', strokeWidth: 3 } };
const emojis = ['random5random5random5random5random5random5random5random5random5random5random5random5'];

const getFirstNode = () => {
  //console.log("test: ", canvasStore.firstNodeText)
  const firstNode: Node = {
    id: '1',
    position: { x: -10, y: -150 },
    data: { label: <SkimifyNode text={"biology, study of living things and their vital processes. The field deals with all the physicochemical aspects of life. The modern tendency toward cross-disciplinary research and the unification of scientific knowledge and investigation from different fields has resulted in significant overlap of the field of biology with other scientific disciplines. Modern principles of other fields—chemistry, medicine, and physics, for example—are integrated with those of biology in areas such as biochemistry, biomedicine, and biophysics." }/> },//canvasStore.firstNodeText
    className: "node node-summary",
  }
  return [firstNode];
}

const randomCoordSign = () => {
  return Math.random() > 0.5 ? -1 : 1;
}

function getRandomInt(min, max) {
  return  Math.floor(Math.random() * (max - min + 1)) + min;
}

const ReactFlowPro = observer(({ strength = -880, distance = 1100 }: ExampleProps = {}) => {
  // const { project } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(getFirstNode());
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // const [nodesToAdd, setNodesToAdd] = useState([]);

  useForceLayout({ strength, distance });

  const toggleNodeClass = useCallback(
    (id, className) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            node = {
              ...node,
              className: node.className.includes(className) ? node.className.replace(className, " ") : className + " " + node.className
            };
          }
          return node;
        })
      );
    }, [setNodes]
  );
  const onNodeClick = useCallback(
    (evt, node) => {
      //console.table("node: ", node)
      //console.table("node to add: ", nodesToAdd)
      const childNodes = [];
      const childEdges = [];

      const nodesToAdd = canvasStore.nodesToAdd;

      for (let i = 0; i < nodesToAdd.length; i++) {
        const parentClass = node.className.split(" ")[1];
        console.log(parentClass);
        const classExt = parentClass === "node-summary" ? "node-dotpoint" : "node-summary";
        const childId = `${ canvasStore.nodesOffset+(i+1)}`;
        const childNode = {
          id: childId,
          position: { x: node.position.x + (randomCoordSign() * getRandomInt(100,200)), y: node.position.y + (randomCoordSign() * getRandomInt(100,200))},
          data: { label: <SkimifyNode text={nodesToAdd[i]}/>},
          className: "node " + classExt,
        };

        const childEdge = { id: `${node.id}->${childId}`, source: node.id, target: childId };
        childNodes.push(childNode);
        childEdges.push(childEdge);
      }
      canvasStore.setNodesOffet(nodesToAdd.length)
      setNodes((nds) => [...nds, ...childNodes]);
      setEdges((eds) => [...eds, ...childEdges]);
    },
    [setNodes, setEdges]
  );

  const createNodes = useCallback (async (evt, node:Node) => {

      const parentClass = node.className.split(" ").at(-1);
      const apiType = parentClass === "node-summary" ? getSummary : getDotPoints;
      toggleNodeClass(node.id,"loading")
      const text = node.data.label.props.text;

      let res = null;
      try {
        res = await apiType(text);
        toggleNodeClass(node.id, "loading")

      } catch(err) {
        toggleNodeClass(node.id, "loading");
        toggleNodeClass(node.id, "loading-error");
      }

      const data =  parentClass === "node-summary" ? res.data.dotpoints : [res.data.summary];
      console.log("data: ", data)
      canvasStore.setNodesToAdd(data);
      onNodeClick(evt, node);
    },
    [toggleNodeClass,onNodeClick]
  )
  const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const resetGraph = () => {
    setNodes([]);
    setEdges([]);
  }
  return (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        proOptions={proOptions}
        onConnect={onConnect}
        nodeOrigin={nodeOrigin}
        onNodeClick={createNodes}
        defaultEdgeOptions={defaultEdgeOptions}
        minZoom={0.3}
        elementsSelectable={false}
        defaultViewport={{ x: window.innerWidth / 2, y: window.innerHeight / 2, zoom: 0.7 }}
      >
        <Panel position='top-left'><RestartCanvas resetGraph={resetGraph}></RestartCanvas></Panel>
        <MiniMap />
        <Background className='bg-slate-100'  variant={BackgroundVariant.Dots} gap={25} />
      </ReactFlow>
  )
})

function ReactFlowWrapper(props: ExampleProps) {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
}

export default ReactFlowWrapper;
