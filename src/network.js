export class Node {
    constructor(name, channel, neighbors) {
        this.name = name;
        this.neighbors = neighbors;
        this.channel = channel;
    }

    switch(numChannels) {
        const switchVal = Math.random();
        if ((numChannels - 1)/numChannels > switchVal) {
            // This changes the channel on the Node, may need to do stuff with Channel class too
            this.channel = Math.floor(Math.random() * numChannels);
        }
    }
}