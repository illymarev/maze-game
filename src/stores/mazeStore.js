import {makeAutoObservable, toJS} from "mobx";

class MazeStore {
    start = null;
    finish = null;
    nodes = [];

    constructor() {
        makeAutoObservable(this, {
            // does not modify the state of the maze store; it calls methods of specified nodes, but those methods are
            // already actions, so there's no need to mark this one as an action
            applyVisualizationAction: false
        });
    };


    /**
     * Applies an action needed to visualize generation/solving
     * @param action javascript objects that represent the visualization action that needs to be applied.
     *               Must have the key "type". Additional info should be provided under the key "payload"
     */
    applyVisualizationAction(action) {
        switch (action.type) {
            // Actions that are applied to multiple nodes at the same time
            case 'bulkSetCurrent': // used in the Kruskal's algorithm
                for (let item of action.payload) {
                    this.nodes[item.row][item.column].setCurrent(item.value);
                }
                break;
            // Every node stores the information for simplicity of drawing maze walls, so the graph is implemented
            // as if it is directed (it stores whether an edge is available from every node the edge is connected to).
            // Because of this, we need to create this edge from both nodes, thus - the method is called bulk create.
            case 'bulkCreateEdge':
                for (let item of action.payload) {
                    this.nodes[item.row][item.column].createEdge(item.direction);
                }
                break;
            // Marks nodes on the shortest path in order to highlight it on the UI
            case 'bulkSetRoute':
                for (let item of action.payload) {
                    this.nodes[item.row][item.column].setRoute(true);
                }
                break;
            case 'resetRoute':
                for (let row of this.nodes) {
                    for (let node of row) {
                        node.setRoute(false);
                    }
                }
                break;
            case 'resetVisited':
                for (let row of this.nodes) {
                    for (let node of row) {
                        node.setVisited(false);
                    }
                }
                break;
            case 'resetCurrent':
                for (let row of this.nodes) {
                    for (let node of row) {
                        node.setCurrent(false);
                    }
                }
                break;
            // Actions that are applied to 1 node at a time
            case 'setCurrent':
                this.nodes[action.payload.row][action.payload.column].setCurrent(action.payload.value);
                break;
            case 'setVisited':
                this.nodes[action.payload.row][action.payload.column].setVisited(action.payload.value);
                break;

            default:
                throw Error('Not Implemented');
        }

    };

    // ACTIONS
    changeFinishNode({row, column}) {
        // Do not allow moving the finish flag to the same node as the start flag
        if (this.nodes[row][column].start) return;

        if (this.finish) {
            this.nodes[this.finish.row]?.[this.finish.column]?.setFinish(false);
        }

        this.finish = {row: row, column: column};
        this.nodes[row][column].setFinish(true);
    };


    changeStartNode({row, column}) {
        // Do not allow moving the start flag to the same node as the finish flag
        if (this.nodes[row][column].finish) return;

        if (this.start) {
            this.nodes[this.start.row]?.[this.start.column]?.setStart(false);
        }

        this.start = {row: row, column: column};
        this.nodes[row][column].setStart(true);
    };


    createEmptyNodes(rows, columns) {
        const newNodes = [];

        for (let row = 0; row < rows; row++) {
            const newRow = []; // create a container for all nodes within a row
            for (let column = 0; column < columns; column++) { // fill the entire row
                newRow.push(new MazeNode(row, column));
            }
            newNodes.push(newRow); // once the row is filled, push it to the all nodes array
        }

        this.nodes = newNodes;
    };

    setNodes(newJSNodes) {
        // newJSNodes is a grid with nodes represented as javascript objects instead of instances of MazeNode class.
        // So we need to create these instances
        const [rows, columns] = [newJSNodes.length, newJSNodes[0].length];

        const newNodes = [];
        for (let row = 0; row < rows; row++) {
            const newRow = [];
            for (let column = 0; column < columns; column++) {
                const node = new MazeNode(row, column);

                node.edges = newJSNodes[row][column].edges;
                node.visited = newJSNodes[row][column].visited;
                node.current = newJSNodes[row][column].current;
                node.isRoute = newJSNodes[row][column].isRoute;
                node.start = newJSNodes[row][column].start;
                node.finish = newJSNodes[row][column].finish;
                newRow.push(node);
            }
            newNodes.push(newRow);
        }

        this.nodes = newNodes;
    };

    // Computeds
    get nodesToJS() {
        return toJS(this).nodes;
    };
}

class MazeNode {
    row = null;
    column = null;

    edges = {north: false, south: false, west: false, east: false};
    visited = false; // indicates if the node has already been visited
    current = false;  // indicates if a visualized algorithm is currently using this node as the main one
    route = false; // indicates if the node is part of the shortest path
    start = false;
    finish = false;

    constructor(row, column) {
        makeAutoObservable(this, {
            // static, used in algorithms & id generation
            row: false, column: false
        });
        this.row = row;
        this.column = column;
    };

    // ACTIONS
    createEdge(direction) {
        this.edges[direction] = true;
    };

    setCurrent(bool) {
        this.current = bool;
    };

    setFinish(bool) {
        this.finish = bool;
    };

    setRoute(bool) {
        this.route = bool;
    };

    setStart(bool) {
        this.start = bool;
    };

    setVisited(bool) {
        this.visited = bool;
    };
}

export default MazeStore