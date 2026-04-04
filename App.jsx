import { useState } from "react";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { bfs } from "./algorithms/bfs";
import { dfs } from "./algorithms/dfs";
import { dijkstra } from "./algorithms/dijkstra";
import "./styles/styles.css";

function App() {
  const [array, setArray] = useState([]);
  const [section, setSection] = useState("sorting");

  const [stack, setStack] = useState([]);
  const [queue, setQueue] = useState([]);

  const [bfsResult, setBfsResult] = useState([]);
  const [dfsResult, setDfsResult] = useState([]);
  const [dijkstraResult, setDijkstraResult] = useState({});

  const [startNode, setStartNode] = useState("A");

  const generateArray = () => {
    const arr = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 200) + 20
    );
    setArray(arr);
  };

  const runSort = (type) => {
    let animations = [];

    if (type === "bubble") animations = bubbleSort(array);
    if (type === "selection") animations = selectionSort(array);
    if (type === "insertion") animations = insertionSort(array);
    if (type === "merge") animations = mergeSort(array);

    const arr = [...array];

    animations.forEach((step, i) => {
      setTimeout(() => {
        if (step.type === "swap") {
          [arr[step.i], arr[step.j]] = [arr[step.j], arr[step.i]];
        }

        if (step.type === "overwrite") {
          arr[step.index] = step.value;
        }

        setArray([...arr]);
      }, i * 100);
    });
  };


  const push = () => {
    const val = Math.floor(Math.random() * 100);
    setStack([...stack, val]);
  };

  const pop = () => {
    setStack(stack.slice(0, -1));
  };

  const enqueue = () => {
    const val = Math.floor(Math.random() * 100);
    setQueue([...queue, val]);
  };

  const dequeue = () => {
    setQueue(queue.slice(1));
  };

  const graph = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F", "G"],
  D: ["H"],
  E: ["I"],
  F: ["J"],
  G: ["K"],
  H: ["L"],
  I: ["M"],
  J: ["N"],
  K: ["O"],
  L: ["P"],
  M: ["Q"],
  N: ["R"],
  O: ["S"],
  P: ["T"],
  Q: ["U"],
  R: ["V"],
  S: ["W"],
  T: ["X"],
  U: ["Y"],
  V: ["Z"],
  W: [],
  X: [],
  Y: [],
  Z: []
};

  const weightedGraph = {
  A: { B: 2, C: 3 },
  B: { D: 4, E: 1 },
  C: { F: 5, G: 2 },
  D: { H: 1 },
  E: { I: 7 },
  F: { J: 3 },
  G: { K: 4 },
  H: { L: 2 },
  I: { M: 6 },
  J: { N: 5 },
  K: { O: 3 },
  L: { P: 4 },
  M: { Q: 2 },
  N: { R: 6 },
  O: { S: 1 },
  P: { T: 3 },
  Q: { U: 2 },
  R: { V: 4 },
  S: { W: 5 },
  T: { X: 6 },
  U: { Y: 3 },
  V: { Z: 1 },
  W: {},
  X: {},
  Y: {},
  Z: {}
};

  const isValidNode = (node) => graph[node];

  const runBFS = () => {
    if (!isValidNode(startNode)) {
      alert("Invalid Node!");
      return;
    }
    setBfsResult(bfs(graph, startNode));
  };

  const runDFS = () => {
    if (!isValidNode(startNode)) {
      alert("Invalid Node!");
      return;
    }
    setDfsResult(dfs(graph, startNode));
  };

  const runDijkstra = () => {
    if (!weightedGraph[startNode]) {
      alert("Invalid Node!");
      return;
    }
    setDijkstraResult(dijkstra(weightedGraph, startNode));
  };

  return (
    <div className="app">
      <h1>DAA Visualizer</h1>

      {/* Navigation */}
      <div className="nav">
        <button onClick={() => setSection("sorting")}>Sorting</button>
        <button onClick={() => setSection("stack")}>Stack</button>
        <button onClick={() => setSection("queue")}>Queue</button>
        <button onClick={() => setSection("graph")}>Graph</button>
      </div>

      {/* Sorting */}
      {section === "sorting" && (
        <>
          <button onClick={generateArray}>Generate Array</button>
          <button onClick={() => runSort("bubble")}>Bubble</button>
          <button onClick={() => runSort("selection")}>Selection</button>
          <button onClick={() => runSort("insertion")}>Insertion</button>
          <button onClick={() => runSort("merge")}>Merge</button>

          <div className="array-container">
            {array.map((val, i) => (
              <div key={i} className="bar" style={{ height: `${val}px` }} />
            ))}
          </div>
        </>
      )}

      {/* Stack */}
      {section === "stack" && (
        <>
          <button onClick={push}>Push</button>
          <button onClick={pop}>Pop</button>
          <div className="box">
            {stack.map((v, i) => (
              <div key={i} className="item">{v}</div>
            ))}
          </div>
        </>
      )}

      {/* Queue */}
      {section === "queue" && (
        <>
          <button onClick={enqueue}>Enqueue</button>
          <button onClick={dequeue}>Dequeue</button>
          <div className="box">
            {queue.map((v, i) => (
              <div key={i} className="item">{v}</div>
            ))}
          </div>
        </>
      )}

      {/* Graph */}
{section === "graph" && (
  <>
    <input
      type="text"
      placeholder="Enter Start Node (A-Z)"
      value={startNode}
      onChange={(e) => setStartNode(e.target.value.toUpperCase())}
    />

    <br />

    <button onClick={runBFS}>BFS</button>
    <button onClick={runDFS}>DFS</button>
    <button onClick={runDijkstra}>Dijkstra</button>

    <p>BFS: {bfsResult.join(" → ")}</p>
          <p>DFS: {dfsResult.join(" → ")}</p>
          <p>Dijkstra: {(dijkstraResult).length > 0 ? "Calculated" : "Not Calculated"}</p>

    <p>
      Dijkstra:
      {Object.entries(dijkstraResult).map(([k, v]) => (
        <span key={k}> {k}:{v} </span>
      ))}
    </p>

    {/* Graph Visualization */}
    <div className="graph-visual">
      {Object.keys(graph).map((node) => {
        const isVisited =
          bfsResult.includes(node) || dfsResult.includes(node);

        const isCurrent =
          bfsResult[0] === node ||
          dfsResult[0] === node ||
          startNode === node;

        return (
          <div
            key={node}
            className={`node 
              ${isVisited ? "visited" : ""} 
              ${isCurrent ? "current" : ""}`}
          >
            {node}
          </div>
        );
      })}
    </div>
  </>
)}

      {/* Complexity */}
      <div className="complexity">
        <h3>Complexity</h3>
        <p>Bubble: O(n²)</p>
        <p>Selection: O(n²)</p>
        <p>Insertion: O(n²)</p>
        <p>Merge: O(n log n)</p>
        <p>BFS/DFS: O(V+E)</p>
        <p>Dijkstra: O(V²)</p>
      </div>
    </div>
  );
}

export default App;