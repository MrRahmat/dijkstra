const graph = {
    start: {0: 1},
    0: {4: 2},
    1: {2: 2, 4: 7, 5:7},
    2: {1: 2, 3: 7, 5: 9, 6: 8},
    3: {2: 7, 6: 5, 10: 6, finish: 7},
    4: {0: 2, 1: 7, 5: 7, 7: 2, 8: 8},
    5: {1: 7, 2: 9, 4: 7, 6: 6, 8: 9},
    6: {2: 8, 3: 5, 5: 6, 9: 8, 10: 1},
    7: {4: 2, 8:2, 11: 8, 14: 8},
    8: {4: 8, 5:9, 7:2, 9: 7, 12: 9},
    9: {6: 8, 8:7, 10: 5, 12: 5, 13: 2},
    10: {3:6, 6:1, 9:5, 13: 4, finish:1},
    11: {7:8, 12:7,14:5,15:2},
    12: {8: 9, 9:5, 11:7, 15:7, 16:8},
    13: {9:2, 10:4, 16:8, finish:6},
    14: {7:8, 11: 5, 15: 6},
    15: {11:2, 12: 7, 14:6},
    16: {12:8, 13: 8, finish:2},
    finish: {}
};

const lowestCost = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
};

// function that returns the minimum cost and path to reach Finish it goes from 0 to 17
const dijkstra = (graph) => {

    // track lowest cost to reach each node
    const costs = Object.assign({finish: Infinity}, graph.start);
    // track paths
    const parents = {finish: null};
    for (let child in graph.start) {
        parents[child] = 'start';
    }

    // track nodes that have already been processed
    const processed = [];

    let node = lowestCost(costs, processed);

    while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
            let newCost = cost + children[n];
            if (!costs[n]) {
                costs[n] = newCost;
                parents[n] = node;
            }
            if (costs[n] > newCost) {
                costs[n] = newCost;
                parents[n] = node;
            }
        }
        processed.push(node);
        node = lowestCost(costs, processed);
    }

    let optimalPath = ['finish'];
    let parent = parents.finish;
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
        distance: costs.finish,
        path: optimalPath
    };

    return results;
};

console.log(dijkstra(graph));
