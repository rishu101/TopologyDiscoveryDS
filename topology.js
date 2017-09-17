function Graph() {
    this.vertices = [];
    this.edges = [];
    this.numberOfEdges = 0;
  }
  
  Graph.prototype.addVertex = function(vertex) {
    this.vertices.push(vertex);
    this.edges[vertex] = [];
  };
  Graph.prototype.removeVertex = function(vertex) {
    var index = this.vertices.indexOf(vertex);
    if(~index) {
      this.vertices.splice(index, 1);
    }
    while(this.edges[vertex].length) {
      var adjacentVertex = this.edges[vertex].pop();
      this.removeEdge(adjacentVertex, vertex);
    }
  };
  Graph.prototype.addEdge = function(vertex1, vertex2) {
    this.edges[vertex1].push(vertex2);
    this.edges[vertex2].push(vertex1);
    this.numberOfEdges++;
  };
  Graph.prototype.removeEdge = function(vertex1, vertex2) {
    var index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;
    var index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;
    if(~index1) {
      this.edges[vertex1].splice(index1, 1);
      this.numberOfEdges--;
    }
    if(~index2) {
      this.edges[vertex2].splice(index2, 1);
    }
  };
  Graph.prototype.size = function() {
    return this.vertices.length;
  };
  Graph.prototype.relations = function() {
    return this.numberOfEdges;
  };

  Graph.prototype.print = function() {
    console.log(this.vertices.map(function(vertex) {
      return (vertex + ' -> ' + this.edges[vertex].join(', ')).trim();
    }, this).join(' | '));
  };

Graph.prototype.discoverTopology = function(vertex, fn) {
    console.log('vertex is: ',vertex)
    if(!~this.vertices.indexOf(vertex)) {
      return console.log('Node not found');
    }

    console.log('Discovering topology from Node: ', vertex)
    var queue = [];
    queue.push(vertex);
    var visited = [];
    visited[vertex] = true;
    var topology = [];
  
    while(queue.length) {
      vertex = queue.shift();
      fn(vertex);
      for(var i = 0; i < this.edges[vertex].length; i++) {
          var result = ''
          var edge = vertex+this.edges[vertex][i];
          var rEdge = edge.split("").reverse().join("");
          if(!topology[edge] && !topology[rEdge]) {
              topology[edge] = true;
              result = edge.split("").join('-');
              console.log(result);
          }
        if(!visited[this.edges[vertex][i]]) {
          visited[this.edges[vertex][i]] = true;
          queue.push(this.edges[vertex][i]);
        }
      }
    }
  };

  var graph = new Graph();  
  graph.addVertex('A');
  graph.addVertex('B');
  graph.addVertex('C');
  graph.addVertex('D');
  graph.addVertex('E');
  graph.addVertex('F');
  graph.addVertex('G');
  graph.addEdge('A', 'B');
  graph.addEdge('A', 'C');
  graph.addEdge('A', 'D');
  graph.addEdge('C', 'B');
  graph.addEdge('B', 'E');
  graph.addEdge('D', 'E');
  graph.addEdge('D', 'F');
  graph.addEdge('F', 'G');
  
console.log('Enter the starting node to discover the topology: ')
var stdin = process.openStdin();
stdin.addListener("data", function(startingNode) {
    graph.discoverTopology(startingNode.toString().trim(), function(vertex) { });
    console.log('Enter the starting node to discover the topology: ')
});
