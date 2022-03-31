import "./App.css";
import { Node, Channel } from "./network";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [nodes, setNodes] = useState([]);
  const [channels, setChannels] = useState([]);
  const [len, setLen] = useState(0);

  const randomChannel = (numChannels) => {
    return Math.floor(Math.random() * numChannels);
  };

  const changeChannel = (channel, channelsArray) => {
    const switchVal = Math.random();
    const numChannels = channelsArray.length;
    if (channel.nodes.length > 1) {
      channel.nodes.forEach(node => {
        if ((numChannels - 1) / numChannels > switchVal) {
          channel.removeNode(node);
          channelsArray[randomChannel(len)].addNode(node)
        }
      })
    }
  };

  const switchAlgo = () => {
    let solutionFound = false;
      console.log("iterate loop")
      console.log(channels)
      let nodesCopy = nodes;
      let channelsCopy = channels;
      channelsCopy.forEach((channel) => {
        changeChannel(channel, channelsCopy);
      });
      setNodes(nodesCopy);
      setChannels(channelsCopy);
      if (channels.some((channel) => channel.nodes.length > 1)) {
        solutionFound = false;
      } else {
        solutionFound = true;
      }
      if(!solutionFound) {
        setInterval(switchAlgo, 500);
      }
  };

  const setupNetwork = (numNodes, numChannels) => {
    setChannels([]);
    setNodes([]);
    setLen(0);
    for (let i = 0; i < numChannels; i++) {
      let channelsCopy = channels;
      channelsCopy.push(new Channel(`channel ${i}`, []));
      setChannels(channelsCopy);
    }
    setLen(channels.length);

    for (let i = 0; i < numNodes; i++) {
      let nodesCopy = nodes;
      nodesCopy.push(new Node(`node ${i}`, null, []));
      setNodes(nodesCopy);
    }

    nodes.forEach((node) => {
      channels[randomChannel(channels.length)].addNode(node);
    });
  };

  const getChannelNodes = (channel) => {
    return channel.nodes.map((node) => {
      return <p>{node.name}</p>;
    });
  };

  const getBackgroundColor = (channel) => {
    if (channel.nodes.length === 0) {
      return "gray";
    }
    if (channel.nodes.length === 1) {
      return "green";
    }
    if (channel.nodes.length > 1) {
      return "red";
    }
  };

  useEffect(() => {
    setupNetwork(5, 6);
  }, []);

  return (
    <div className="App">
      <Nav startAlgorithm={switchAlgo} />
      <div className="main-container">
        <div className="main-grid">
          {channels.map((channel) => {
            return (
              <div
                className="grid-item"
                style={{ backgroundColor: getBackgroundColor(channel) }}
              >
                {channel.name}
                {getChannelNodes(channel)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
