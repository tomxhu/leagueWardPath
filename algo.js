//@author devenbhooshan

function Graph(){
	this.isWeighted=false;
	this.nodes=[]
	this.addNode=addNode;
	this.removeNode=removeNode;
	this.nodeExist=nodeExist;
	this.getAllNodes=getAllNodes;
	function addNode(Name){
		temp=new Node(Name);
		this.nodes.push(temp);
		return temp;
	}
	function removeNode(Name){
		
		index=this.nodes.indexOf(Name);
		if(index>-1){
			this.nodes.splice(index,1);
			len=this.nodes.length;

			for (var i = 0; i < len; i++) {
				if(this.nodes[i].adjList.indexOf(Name)>-1){
					this.nodes[i].adjList.slice(this.nodes[i].adjList.indexOf(Name));
					this.nodes[i].weight.slice(this.nodes[i].adjList.indexOf(Name));
				}
			}
		}
		
	}
	function nodeExist(Name){
		index=this.nodes.indexOf(Name);
		if(index>-1){
			return true;
		}
		return false;
	}

	function getAllNodes(){
		return this.nodes;
	}
	
	function getBFSTravaersal(){

	}

	function getBFSTravaersal(){
		
	}
	
	function getBFSTravaersal(){
		
	}

}

function Node(Name){
	this.name=Name;
	this.adjList=[];
	this.weight=[];
	this.addEdge=addEdge;
	this.compare=compare;
	function addEdge(neighbour,weight){
		this.adjList.push(neighbour);
		this.weight.push(weight);	
	}
	
	function getAdjList(){
		return adjList;
	}
	function compare(node2){
		return this.weight-node2.weight;
	}
}
function bfs(graph){
	ans=[];
	traversedNodes=[];
	traversedNodes.push(graph.nodes[0]);
	allNodes=graph.getAllNodes();
	marked={};
	while(traversedNodes.length!=0){
		var v=traversedNodes.shift();
		marked[v.name]=true;
		console.log(v);
		ans.push(v);
		adjList=v.adjList;
		for (var i=0;i<adjList.length;i++){
			u=adjList[i];
			if(marked[u.name]!=true){
				traversedNodes.push(u);
				marked[u.name]=true;

			}
		}			
	}
	return ans;
}


function dfs(graph){
	ans=[];
	traversedNodes=[];
	traversedNodes.push(graph.nodes[0]);
	allNodes=graph.getAllNodes();
	marked={};
	while(traversedNodes.length!=0){
		var v=traversedNodes.pop();
		marked[v.name]=true;
		adjList=v.adjList;
		console.log(v);
		ans.push(v);
		for (var i=0;i<adjList.length;i++){
			u=adjList[i];
			if(marked[u.name]!=true){
				traversedNodes.push(u);
				marked[u.name]=true;
			}
		}			
	}
	return ans;
}

function binaryHeap(){
	this.nodes=[];
}

binaryHeap.prototype.size=function(){
		return this.nodes.length;
};

binaryHeap.prototype.compare = function(node1,node2) {
	return node1.priority-node2.priority;
};
binaryHeap.prototype.insert_push = function(element) {
	this.nodes.push(element);
	this.bubbleUp(this.nodes.length-1);
};

binaryHeap.prototype.remove_pop = function() {
	var ans=this.nodes[0];
	var last_element=this.nodes.pop();
	
	if(this.nodes.length> 0){
		this.nodes[0]=last_element;
		this.sinkDown(0);
	}
	return ans;
};

binaryHeap.prototype.delete_node = function(node) {
	var length=this.nodes.length;
	isPresent=false;
	for (var i = 0; i < length; i++) {
		if((this.nodes[i].content!=node)) continue;
		var end=this.nodes.pop();
		if(i==length-1) break;
		this.nodes[i]=end;
		this.bubbleUp(i);
		this.sinkDown(i);
		isPresent=true;
		break;
	}
	return isPresent;
};

binaryHeap.prototype.top = function() {
	return this.nodes[0];
};

binaryHeap.prototype.sinkDown = function(i) {
	var length=this.nodes.length;	
	while(true && i<length){
		var flag=0;
		if(2*i+1 < length && this.compare(this.nodes[i],this.nodes[2*i+1])>0){
			if(2*i+2< length && this.compare(this.nodes[2*i+1],this.nodes[2*i+2])>0){
				flag=2;
			}else{
				flag=1;
			}	
		}else if( 2*i+2 < length && this.compare(this.nodes[i],this.nodes[2*i+2])>0){
			flag=2;
		}else {
			break;
		}
			var temp=this.nodes[2*i+flag];
			this.nodes[2*i+flag]=this.nodes[i];
			this.nodes[i]=temp;
			i=2*i+flag;
	}
};


binaryHeap.prototype.bubbleUp = function(i) {
	
	var length=this.nodes.length;	
	while(i>0){
		var index=Math.floor((i+1)/2)-1;
		//console.log(this.compare(this.nodes[i],this.nodes[index]));
		if(this.compare(this.nodes[i],this.nodes[index])<0){
			//console.log(this.nodes[i].priority+' '+this.nodes[index].priority);
			var temp=this.nodes[index];
			this.nodes[index]=this.nodes[i];
			this.nodes[i]=temp;
			i=index;
		}else {
			break;
		}
			
	}
};


function MinPQ(list){
	
	bh=new binaryHeap();
	this.heap=bh;
}

MinPQ.prototype.push=function(node,priority){
	var temp=new MinPQNodes(node,priority);
	this.heap.insert_push(temp);
};

MinPQ.prototype.pop=function(){
	return this.heap.remove_pop().content;
};


MinPQ.prototype.remove=function(node){
	return this.heap.delete_node(node);
};

MinPQ.prototype.top=function(){
	return this.heap.top().content;
};
MinPQ.prototype.size=function(){
	return this.heap.size();
};

function MinPQNodes(content,priority){
	this.content=content;
	this.priority=priority;
}


function dijkstra(graph,source,destination){

	this.previousNode=[];
	this.distance=new Array();				
	this.distance[source.name]=0;
	this.pq=new MinPQ();
	var nodes=graph.getAllNodes();
	length=nodes.length;
	for(var i=0;i<length;i++){
		if(nodes[i]!=source){
			this.distance[nodes[i].name]=Number.POSITIVE_INFINITY;
		}
		pq.push(nodes[i],this.distance[nodes[i].name]);
	}
	
	while(pq.size()!=0){
		u=pq.pop();
		adjList=u.adjList;
		for (var i = 0; i < adjList.length; i++) {
			v=adjList[i];
			if(this.distance[u.name]!=Number.POSITIVE_INFINITY){
				alt=this.distance[u.name]+u.weight[i];
				if(alt<this.distance[v.name]){
					this.distance[v.name]=alt;
					this.previousNode[v.name]=u.name;
					pq.remove(v);
					pq.push(v,this.distance[v.name]);
				}
			}
		}
	}
	if(typeof destination==='undefined'){

	}else 
	return this.distance[destination.name];
}

function bellman_ford(graph,source,destination){
	this.previousNode=[];
	this.distance=new Array();				
	this.distance[source.name]=0;
	var nodes=graph.getAllNodes();
	length=nodes.length;
	for(var i=0;i<length;i++){
		if(nodes[i]!=source){
			this.distance[nodes[i].name]=Number.POSITIVE_INFINITY;
		}
	}
	
	for(var k=0;k<length;k++){
		for(var j=0;j<length;j++){
			u=nodes[j];
			adjList=u.adjList;
			for (var i = 0; i < adjList.length; i++) {
				v=adjList[i];
				if(this.distance[u.name]!=Number.POSITIVE_INFINITY){	
					alt=this.distance[u.name]+u.weight[i];
					if(alt<this.distance[v.name]){

						this.previousNode[v.name]=u.name;
						this.distance[v.name]=alt;
					}
				}
			}
		}
	}

	for(var j=0;j<length;j++){
		u=nodes[j];
		adjList=u.adjList;
		for (var i = 0; i < adjList.length; i++) {
			v=adjList[i];
			if(this.distance[u.name]!=Number.POSITIVE_INFINITY){	
				alt=this.distance[u.name]+u.weight[i];
				if(alt<this.distance[v.name]){
					return null;
				}
			}
		}
	}
	
	return this.distance[destination.name];	

}

function johnson(graph){
	try
	{
		// http://en.wikipedia.org/wiki/Johnson%27s_algorithm
		temp=new Node('temp');
		graph.addNode(temp);
		nodes=graph.getAllNodes();
		length=nodes.length;
		for(var j=0;j<length-1;j++){
			u=nodes[j];
			temp.addEdge(u,0);
		}
		vari=bellman_ford(graph,temp,temp);
		if(vari==null) {
			return null;
		}
		bell=new bellman_ford(graph,temp,temp);
		length=nodes.length;
		h=bell.distance;
		graph.removeNode(temp);		
		length=nodes.length;
		for(var j=0;j<length;j++){
			u=nodes[j];
			adjList=u.adjList;
			for (var i = 0; i < adjList.length; i++) {
				v=adjList[i];
				u.weight[i]=u.weight[i]+h[u.name]-h[v.name];
			}
		}	
		distanceMatrix=new Array()
		length=nodes.length;
		for(var j=0;j<length;j++){
			u=nodes[j];
			list=u.weight;
			len=list.length;
			dij=new dijkstra(graph,nodes[j]);
			distanceMatrix[nodes[j].name]=dij.previousNode;
			
		}
		for(var j=0;j<length;j++){
			u=nodes[j];
			adjList=u.adjList;
			for (var i = 0; i < adjList.length; i++) {
				v=adjList[i];
				u.weight[i]=u.weight[i]-h[u.name]+h[v.name];
			}
		}
	}
	catch(e)
	{
		console.log(e);
	}
	return distanceMatrix;	
}
//Minimum Spanning Tree

function prim(graph){

	nodes=graph.getAllNodes();
	this.error=false;
	this.Vnode=[];
	this.Vedge=[];
	this.Vnode.push(nodes[0]);

	this.pq=new MinPQ();
	
	this.InsertEdgeIntoPQ(nodes[0],this.pq)
	
	while(this.Vnode.length!=nodes.length){

		if(this.pq.size()==0){ 
			this.error=true;
			return ;
		}

		while(this.pq.size()!=0){

			minEdge=this.pq.pop();
			if(this.Vnode.indexOf(minEdge[1])==-1){

				this.Vedge.push(minEdge);
				this.Vnode.push(minEdge[1]);
				this.InsertEdgeIntoPQ(minEdge[1],this.pq);
				break;
			}

		}
	}
	return;
}

prim.prototype.InsertEdgeIntoPQ = function(node,pq) {
	adjList=node.adjList;
	wights=node.weight;
	for (var i = 0; i < adjList.length; i++) {
		temp=[];
		temp.push(node);
		temp.push(adjList[i]);
		pq.push(temp,wights[i]);		
	}
}





var lol = new Graph();

nodeA = lol.addNode('a');
nodeB = lol.addNode('b');
nodeC = lol.addNode('c');
nodeD = lol.addNode('d');
nodeE = lol.addNode('e');
nodeF = lol.addNode('f');
nodeG = lol.addNode('g');
nodeH = lol.addNode('h');
nodeI = lol.addNode('i');
nodeJ = lol.addNode('j');
nodeK = lol.addNode('k');
nodeL = lol.addNode('l');
nodeM = lol.addNode('m');
nodeO = lol.addNode('n');
nodeN = lol.addNode('o');
nodeP = lol.addNode('p');
nodeQ = lol.addNode('q');
nodeR = lol.addNode('r');
nodeS = lol.addNode('s');
nodeT = lol.addNode('t');
nodeU = lol.addNode('u');
nodeV = lol.addNode('v');
nodeW = lol.addNode('w');
nodeX = lol.addNode('x');

nodeA.addEdge(nodeB, 281.22);

nodeB.addEdge(nodeA, 281.22);
nodeB.addEdge(nodeC, 636.71);
nodeB.addEdge(nodeJ, 256.03);
nodeB.addEdge(nodeO, 599.16);

nodeC.addEdge(nodeB, 636.71);
nodeC.addEdge(nodeD, 128.51);

nodeD.addEdge(nodeC, 128.51);
nodeD.addEdge(nodeE, 190.88);
nodeD.addEdge(nodeG, 287.17);

nodeE.addEdge(nodeD, 190.88);
nodeE.addEdge(nodeF, 359.42);

nodeF.addEdge(nodeE, 359.42);
nodeF.addEdge(nodeG, 258.79);
nodeF.addEdge(nodeH, 231.25);
nodeF.addEdge(nodeX, 308.08);

nodeG.addEdge(nodeD, 287.17);
nodeG.addEdge(nodeF, 258.79);
nodeG.addEdge(nodeH, 103.97);

nodeH.addEdge(nodeF, 231.25);
nodeH.addEdge(nodeG, 103.97);
nodeH.addEdge(nodeI, 243.04);

nodeI.addEdge(nodeH, 243.04);
nodeI.addEdge(nodeJ, 379.65);
nodeI.addEdge(nodeL, 184.53);
nodeI.addEdge(nodeX, 243.52);

nodeJ.addEdge(nodeB, 256.03);
nodeJ.addEdge(nodeI, 379.65);
nodeJ.addEdge(nodeK, 240.57);

nodeK.addEdge(nodeJ, 240.57);
nodeK.addEdge(nodeL, 189.37);
nodeK.addEdge(nodeM, 159.76);

nodeL.addEdge(nodeI, 184.53);
nodeL.addEdge(nodeK, 189.37);
nodeL.addEdge(nodeM, 152.98);
nodeL.addEdge(nodeQ, 146.83);

nodeM.addEdge(nodeL, 184.53);
nodeM.addEdge(nodeK, 159.76);
nodeM.addEdge(nodeN, 164.97);

nodeN.addEdge(nodeM, 164.97);
nodeN.addEdge(nodeO, 108.58);
nodeN.addEdge(nodeP, 207.33);


nodeO.addEdge(nodeB, 599.16);
nodeO.addEdge(nodeN, 108.58);
nodeO.addEdge(nodeP, 238.67);

nodeP.addEdge(nodeN, 207.33);
nodeP.addEdge(nodeO, 238.67);
nodeP.addEdge(nodeS, 166.35);

nodeQ.addEdge(nodeL, 146.83);
nodeQ.addEdge(nodeR, 121.80);

nodeR.addEdge(nodeQ, 121.80);
nodeR.addEdge(nodeS, 205.06);

nodeS.addEdge(nodeR, 205.06);
nodeS.addEdge(nodeP, 166.35);
nodeS.addEdge(nodeT, 212.97);

nodeT.addEdge(nodeS, 212.97);
nodeT.addEdge(nodeU, 218.44);

nodeU.addEdge(nodeT, 218.44);
nodeU.addEdge(nodeV, 128.55);

nodeV.addEdge(nodeU, 128.55);
nodeV.addEdge(nodeW, 190.23);

nodeW.addEdge(nodeV, 190.23);
nodeW.addEdge(nodeX, 140.08);

nodeX.addEdge(nodeW, 140.08);
nodeX.addEdge(nodeI, 243.52);
nodeX.addEdge(nodeF, 308.08);



var msp = new prim(lol);
msp.Vedge.forEach(function(edge){
	console.log(edge[0].name + ' ' + edge[1].name)
})





