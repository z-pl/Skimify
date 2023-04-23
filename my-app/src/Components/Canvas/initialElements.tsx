import { Edge, Node } from 'reactflow';
import SkimifyNode from './SkimifyNode';
const text = ""
export const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: <SkimifyNode text={'biology, study of living things and their vital processes. The field deals with all the physicochemical aspects of life. The modern tendency toward cross-disciplinary research and the unification of scientific knowledge and investigation from different fields has resulted in significant overlap of the field of biology with other scientific disciplines. Modern principles of other fields—chemistry, medicine, and physics, for example—are integrated with those of biology in areas such as biochemistry, biomedicine, and biophysics.'}/> },
    className: "node node-summary",
  },
  // {
  //   id: '2',
  //   position: { x: 10, y: 10 },
  //   data: { label: 'test2' },
  //   className: "node",
  // },
  // {
  //   id: '3',
  //   position: { x: -10, y: -10 },
  //   data: { label: 'test3' },
  //   className: "node",
  // },
  // {
  //   id: '4',
  //   position: { x: -10, y: 10 },
  //   data: { label: 'test4' },
  //   className: "node",
  // },
  // {
  //   id: '5',
  //   position: { x: 10, y: -10 },
  //   data: { label: 'test5' },
  //   className: "node",
  // },
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
