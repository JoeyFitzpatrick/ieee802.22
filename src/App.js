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

  const changeChannels = (channelsArray) => {
    console.log("change channel");
    const switchVal = Math.random();
    const numChannels = channelsArray.length;
    channelsArray.map((channel) => {
      if (channel.nodes.length > 1) {
        channel.nodes.map((node) => {
          if ((numChannels - 1) / numChannels > switchVal) {
            channel.removeNode(node);
            channelsArray[randomChannel(numChannels)].addNode(node);
          }
          return node
        });
      }
      return channel;
    });
    return channelsArray;
  };

  const switchAlgo = () => {
    const intervalId = setInterval(() => {
      console.log("iterate loop");
      // let channelsCopy = channels;
      // channelsCopy.forEach((channel) => {
      //   changeChannel(channel, channelsCopy);
      // });
      let channelsCopy = changeChannels(channels);
      setChannels(channelsCopy);
      if (channels.every((channel) => channel.nodes.length <= 1)) {
        clearInterval(intervalId)
      }
    }, 500);
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

  const [count, setCount] = useState([1, 2, 3]);

  useEffect(() => {
    setInterval(() => {
      setCount(prevCount => prevCount.map(item => item += 1));
    }, 500);
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
