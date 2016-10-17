    function draw(data){

    d3.select("svg").remove();

      var dataMap = data.reduce(function(map, node) {
        map[node.name] = node;
        return map;
      }, {});

      var treeData = [];
      data.forEach(function(node) {
        var parent = dataMap[node.parent];
        var value = dataMap[node.value];
        if (parent) {

          (parent.children || (parent.children = []))

            .push(node);
        } else {

          treeData.push(node);
        }
      });

      var margin = {top: 100, right: 120, bottom: 20, left: 120},
        width = 3000 - margin.right - margin.left,
        height = 1500 - margin.top - margin.bottom;
        
        var i = 0;

      var tree = d3.layout.tree()
        .size([height, width]);

      var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.x, d.y]; });

      var svg = d3.select("#tree").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      root = treeData[0];
      update(root);
      function update(source) {


        var nodes = tree.nodes(root),
          links = tree.links(nodes);


      nodes.forEach(function(d) { d.y = d.depth * 130; });


        var node = svg.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });


       var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")"; });

        nodeEnter.append("circle")
          .attr("r", 20)
          .style("fill", function(d) { return d.level; });

        nodeEnter.append("text")
          .attr("y", function(d) { 
            return d.children || d._children ? -30 : 30; })
          .attr("dy", ".35em")
          .attr("text-anchor", "middle")
          .text(function(d) { return d.name; })
          .style("fill-opacity", 1);


        var link = svg.selectAll("path.link")
          .data(links, function(d) { return d.target.id; });


        link.enter().insert("path", "g")
          .attr("class", "link")
          .attr("d", diagonal);
      } 
            
    }
  