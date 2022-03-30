import "./App.css";
import { Node, Channel } from "./network";

function App() {

  const changeChannel = (node, numChannels) => {
    const switchVal = Math.random();
    if ((numChannels - 1)/numChannels > switchVal) {
        // This changes the channel on the Node, may need to do stuff with Channel class too
        node.channel = channels[Math.floor(Math.random() * numChannels)];
    }
}

  const channels = [];
  for (let i = 0; i < 10; i++) {
    channels.push(new Channel(`channel${i}`, []));
  }
  
  const len = channels.length;

  const nodes = [];
  for (let i = 0; i < 5; i++) {
    nodes.push(new Node(`n${i}`, channels[i], []));
  }
  nodes.forEach(node => changeChannel(node, len));

  return (
    <div className="App">
      {nodes.map((node) => {
        return <div>{node.name}: {JSON.stringify(node.channel)}</div>;
      })}
    </div>
  );
}

export default App;
