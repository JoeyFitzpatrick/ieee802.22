import "./App.css";
import { Node, Channel } from "./network";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [nodes, setNodes] = useState([]);
  const [channels, setChannels] = useState([]);
  const [len, setLen] = useState(0);
  const [environment, setEnvironment] = useState("Cooperative");
  const [iterations, setIterations] = useState(0);
  const [numNodes, setNumNodes] = useState(0);
  const [numChan, setNumChan] = useState(0);

  const randomChannel = (numChannels) => {
    return Math.floor(Math.random() * numChannels);
  };

  const costFunc = (N, M) => (N * M) / Math.max(1, M - N);

  const pFunc = (c, N, M) => {
    return Math.pow(1 / (1 + Math.pow(c, costFunc(N, M))), 1 / Math.max(1, N - 1));
  };

  const changeChannels = (channelsArray) => {
    console.log("change channel");
    const switchVal = Math.random();
    const numChannels = channelsArray.length;
    channelsArray.map((channel) => {
      if (channel.nodes.length > 1) {
        channel.nodes.map((node) => {
          if (
            ((numChannels - 1) / numChannels > switchVal &&
              environment === "Cooperative") ||
            (pFunc(1.2, nodes.length, channelsArray.length) > switchVal &&
              environment === "Competitive")
          ) {
            channel.removeNode(node);
            channelsArray[randomChannel(numChannels)].addNode(node);
          }
          return node;
        });
      }
      return channel;
    });
    return channelsArray;
  };

  const changeEnvironment = () => {
    if (environment === "Cooperative") {
      setEnvironment("Competitive");
    } else if (environment === "Competitive") {
      setEnvironment("Cooperative");
    } else {
      console.log("Unknown environment");
    }
  };

  const switchAlgo = () => {
    const intervalId = setInterval(() => {
      setIterations((iterations) => iterations + 1);
      let channelsCopy = changeChannels(channels);
      setChannels(channelsCopy);
      if (channels.every((channel) => channel.nodes.length <= 1)) {
        clearInterval(intervalId);
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

  const handleNodeChange = (e) => {
    setNumNodes(e.target.value)
  }

  const handleChanChange = (e) => {
    setNumChan(e.target.value)
  }

  const handleSubmit = (e) => {
    setupNetwork(numNodes, numChan);
    e.preventDefault();
  }

  // useEffect(() => {
  //   setupNetwork(5, 6);
  // }, []);

  const [count, setCount] = useState([1, 2, 3]);

  useEffect(() => {
    setInterval(() => {
      setCount((prevCount) => prevCount.map((item) => (item += 1)));
    }, 500);
  }, []);

  return (
    <div className="App">
      <Nav startAlgorithm={switchAlgo} changeEnvironment={changeEnvironment} />
      <h4>Currently in {environment} environment</h4>
      <h6>Iterations: {iterations}</h6>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="Input number of nodes between 1 and 100"
          onChange={handleNodeChange}
        ></input>
        <input
          className="form-control"
          type="text"
          placeholder="Input number of channels between number of nodes and 100"
          onChange={handleChanChange}
        ></input>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
      <div className="main-container">
        <div className="main-grid">
          {channels.map((channel) => {
            return (
              <div
                className="grid-item"
                style={{ backgroundColor: getBackgroundColor(channel), color: "white" }}
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
