import { Edge, Node } from 'reactflow';
import SkimifyNode from './SkimifyNode';
import textAreaStore from "../../mobx/stores/UserInputText";
import canvasStore from '../../mobx/stores/CanvasStore';

export const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: <SkimifyNode text={canvasStore.firstNodeText}/> },
    className: "node node-summary",
  },
];

export const initialEdges: Edge[] = [
  // {
  //   id: '1->2',
  //   source: '1',
  //   target: '2',
  // },
  // {
  //   id: '1->3',
  //   source: '1',
  //   target: '3',
  // },
  // {
  //   id: '1->4',
  //   source: '1',
  //   target: '4',
  // },
  // {
  //   id: '1->5',
  //   source: '1',
  //   target: '5',
  // },
];
