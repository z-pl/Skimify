import { useEffect } from 'react';
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
  SimulationNodeDatum,
  SimulationLinkDatum,
} from 'd3-force';

import { useReactFlow, ReactFlowState, useStore, Node } from 'reactflow';

type UseForceLayoutOptions = {
  strength: number;
  distance: number;
};

type SimNodeType = SimulationNodeDatum & Node;

const elementCountSelector = (state: ReactFlowState) => state.nodeInternals.size + state.edges.length;
const nodesInitializedSelector = (state: ReactFlowState) =>
  Array.from(state.nodeInternals.values()).every((node) => node.width && node.height) && state.nodeInternals.size;

function useForceLayout({ strength = -1000, distance = 150 }: UseForceLayoutOptions) {
  const elementCount = useStore(elementCountSelector)
  const nodesInitialized = useStore(nodesInitializedSelector);
  const { setNodes, getNodes, getEdges } = useReactFlow();

  useEffect(() => {
    const nodes = getNodes();
    const edges = getEdges();

    if (!nodes.length || !nodesInitialized) {
      return;
    }

    const simulationNodes: SimNodeType[] = nodes.map((node) => ({
      ...node,
      x: node.position.x,
      y: node.position.y,
    }));

    const simulationLinks: SimulationLinkDatum<SimNodeType>[] = edges.map((edge) => edge);

    const simulation = forceSimulation()
      .nodes(simulationNodes)
      .force('charge', forceManyBody().strength(strength))
      .alphaDecay(0.03)
      .velocityDecay(0.2)
      .force(
        'link',
        forceLink(simulationLinks)
          .id((d: any) => d.id)
          .strength(0)
      )
      .force('x', forceX().x(simulationNodes[0].x).strength(0.01))
      .force('y', forceY().y(simulationNodes[0].y).strength(0.01))
      .alpha(0.1).restart()
      .on('tick', () => {
        setNodes(
          simulationNodes.map((node) => ({
            id: node.id,
            data: node.data,
            position: { x: node.x ?? 0, y: node.y ?? 0 },
            className: node.className,
          }))
        );
      });

    return () => {
      simulation.stop();
    };
  }, [elementCount, getNodes, getEdges, setNodes, strength, distance, nodesInitialized]);
}

export default useForceLayout;

      // .force(
      //   'link',
      //   forceLink(simulationLinks)
      //     .id((d: any) => d.id)
      //     .strength(1)
      //     .distance(distance)
      // )
      // .force('x', forceX().x(0).strength(0.1))
      // .force('y', forceY().y(0).strength(0.1))
