import "./App.css";
import { Node } from "./network";

function App() {
  const nodes = [];
  for (let i = 0; i < 5; i++) {
    nodes.push(new Node(`n${i}`, [], i));
  }
  return (
    <div className="App">
      {nodes.map((node) => {
        return <div>{node.name}</div>;
      })}
    </div>
  );
}

export default App;
