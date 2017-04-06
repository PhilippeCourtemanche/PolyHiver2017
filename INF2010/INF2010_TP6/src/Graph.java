import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;


public class Graph {

	private List<Node> nodes; // Noeuds
	private List<Edge> edges; // Les arcs
	static final double inf = 99999;
	public Graph() {
		
	}
	
	//permet de creer le graphe a partir d'un fichier "graphte.txt"
	public void readFromFile(String filePath,String separtor){
		// A completer
		
		//avec la premiere ligne on cree les noeuds
		//on boucle a travers les lignes restantes
			//pour le noeud courant on sauvegarde la distance entre ce noeud courant et les autres noeuds 
	}
	
	//permet de retourner tous les arcs sortant d'un noeud source
	public List<Edge> getOutEdges(Node source) {
		List<Edge> outEdges = new LinkedList<Edge>(); 
		// A completer
		
		//parcourir la liste d'arcs
		for(Edge arc : edges)
		{
			//si un arc est sortant du noeud source, on l'ajoute a la liste de d'arcs sortants
			if(arc.getSource() == source)
			{
				outEdges.add(arc);
			}
		}
			
		return outEdges;	
	}
	
	public List<Edge> getInEdges(Node dest) {
		List<Edge> inEdges = new LinkedList<Edge>(); 
		// A completer 
		
		//parcourir la liste d'arcs
				for(Edge arc : edges)
				{
					//si un arc est entrant au noeud source, on l'ajoute a la liste d'arcs entrants
					if(arc.getSource() == dest)
					{
						inEdges.add(arc);
					}
				}
		return inEdges;		
	}
	// Accesseurs 
	public List<Node> getNodes() {
		return nodes;
	}
	public void setNodes(List<Node> nodes) {
		this.nodes = nodes;
	}
	public List<Edge> getEdges() {
		return edges;
	}
	public void setEdges(List<Edge> edges) {
		this.edges = edges;
	}
	public Node getNodeByName(String name){
		for (Node node : nodes) {
			if(node.getName().equals(name)){
				return node;
			}
		}
		return null;
	}
}