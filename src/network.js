export class Node {
  constructor(name, channel, neighbors) {
    this.name = name;
    this.channel = channel;
    this.neighbors = neighbors;
  }
}

export class Channel {
  constructor(name, nodes) {
    this.name = name;
    this.nodes = nodes;
  }

  removeNode(node) {
    const index = this.nodes.indexOf(node);
    if (index > -1) {
      this.nodes.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  addNode(node) {
      this.nodes.push(node);
      node.channel = this;
  }
}
