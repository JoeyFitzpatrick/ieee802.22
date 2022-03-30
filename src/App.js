import "./App.css";
import { Node, Channel } from "./network";

function App() {
  const channels = [];
  for (let i = 0; i < 10; i++) {
    channels.push(new Channel(`channel ${i}`, []));
  }
  
  const len = channels.length;

  const randomChannel = (numChannels) => {
    return Math.floor(Math.random() * numChannels);
  }

  const changeChannel = (node, numChannels) => {
    const switchVal = Math.random();
    if ((numChannels - 1)/numChannels > switchVal) {
        // This changes the channel on the Node, may need to do stuff with Channel class too
        node.channel = channels[randomChannel(len)];
    }
}

  const nodes = [];
  for (let i = 0; i < 5; i++) {
    nodes.push(new Node(`node ${i}`, null, []));
  }

  nodes.forEach(node => {
    channels[randomChannel(len)].addNode(node);
    // changeChannel(node, len)
  });

  return (
    <div className="App">
      {nodes.map((node) => {
        return <div>{node.name}: {node.channel.name}</div>;
      })}
    </div>
  );
}

export default App;
