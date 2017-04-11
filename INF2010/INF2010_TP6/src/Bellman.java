import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Stack;
import java.util.Vector;
import java.lang.*;



public class Bellman {
	private Graph graph;
	private Node sourceNode;
	private List<Vector<Double>> piTable = new ArrayList<Vector<Double>>();
	private List<Vector<Integer>> rTable = new ArrayList<Vector<Integer>>();
	Integer myInf = Integer.MAX_VALUE;

	public Bellman (Graph g) {
		this.graph = g;
	}

	public void setSourceNode(Node source) {
		this.sourceNode = source;

	}

	public void shortestPath() {
		// completer

		Vector<Double>calculs=new Vector();
		Vector<Integer>prec=new Vector();
		/*
		 * 
		 * premiere ligne de la piTable
		 */
		for(Node node : graph.getNodes())
		{
			if(node.getName()!=sourceNode.getName())
			{
				calculs.add(graph.inf);
			}
			else
			{
				calculs.add(0.0);
			}
			prec.add(null);
		}

		piTable.add(new Vector<Double>(calculs));
		rTable.add(new Vector<Integer>(prec));
		int k=1;
		/*
		 * 
		 * remplissage de la pitable et de la rtable
		 */
		while(k!=graph.getNodes().size())
		{
			piTable.add(new Vector<Double>());
			rTable.add(new Vector<Integer>());

			k++;
		}
		k=1;
		boolean egal=false;
		prec=new Vector<Integer>();
		for(Node node:graph.getNodes())
		{
			prec.add(null);
		}
		for(k=1;k<graph.getNodes().size() && !egal;k++)
		{

			int precedent=k-1;
			calculs=new Vector<Double>();


			for(Node node : graph.getNodes())//pour chaque node existant dans le graphe
			{

				double min=piTable.get(precedent).get(node.getId());

				Edge arcMin =new Edge();
				for(Edge edge :graph.getInEdges(node))
				{

					if((piTable.get(precedent).get(edge.getSource().getId()) + edge.getDistance())<min)
					{

						min=piTable.get(precedent).get(edge.getSource().getId())+edge.getDistance();
						arcMin=edge; 

					}

				}
				calculs.add(new Double(min));
				if( piTable.get(precedent).get(node.getId())>min)
				{
					if(!arcMin.equals(null))
						prec.set(node.getId(),new Integer(arcMin.getSource().getId()));
					else
						prec.set(node.getId(),new Integer(rTable.get(precedent).get(node.getId())));

				}

			}

			piTable.set(k, new Vector<Double>(calculs));
			rTable.set(k,new Vector<Integer>(prec));
			if(piTable.get(k-1).equals(piTable.get(k)))
			{
				egal=true;
			}
		}
	}

	public void  diplayShortestPaths() {
		Stack<Node> path=new Stack<Node>();
		boolean estNegatif=false;
		if(!estNegatif)
		{
			for(Node node:graph.getNodes())
			{
				int nodeInserer;
				int k=(piTable.size())-1;
				Node actuel=node;
				do{

					nodeInserer=rTable.get(k).get(actuel.getId());
					path.push( graph.getNodes().get(nodeInserer));
					actuel=graph.getNodes().get(nodeInserer);

				}while(nodeInserer!=sourceNode.getId());
				System.out.print("["+ sourceNode + "-"+node+"]");
				while(!path.isEmpty())
				{
					System.out.print(path.peek().getName() + "->");
					path.pop();
				}
				System.out.println(" ");

			}
		}
		// A completer	

	}

	public void displayTables() {
		// A completer
		/***********************
		 * Afficgahe pitable
		 ****************************/
		int precedentId=999999;

		System.out.println("<<PITABLE>> :");
		System.out.print("k"+ "\t"  + ":" +"\t");
		for(Node node:graph.getNodes())
		{
			System.out.print(node.getName() + "\t");
		}
		System.out.println("");
		for(Vector<Double> vector:piTable)
		{
			if(!vector.isEmpty())
			{
				int iD=piTable.indexOf(vector);
				if(iD!=precedentId)
				{
					System.out.print(iD+ "\t"  + ":" +"\t");
				}
				else
				{
					iD++;
					System.out.print(iD+ "\t"  + ":" +"\t");
				}
				for(double valeur : vector)
				{
					if(valeur!=graph.inf)
						System.out.print(valeur+ "\t");
					else
						System.out.print("inf"+"\t");
				}
				System.out.println("");
				precedentId=iD;
			}
		}
		/****************
		 * Afficgahe Rtable
		 ****************/
		precedentId=999999999;
		System.out.println("<<RTABLE>> :");

		System.out.print("k"+ "\t"  + ":" +"\t");
		for(Node node:graph.getNodes())
		{
			System.out.print(node.getName() + "\t");
		}
		System.out.println("");
		for(Vector<Integer> vector:rTable)
		{
			if(!vector.isEmpty())
			{
				int iD=rTable.indexOf(vector);
				if(iD!=precedentId)
				{
					System.out.print(iD+ "\t"  + ":" +"\t");
				}
				else
				{
					iD++;
					System.out.print(iD+ "\t"  + ":" +"\t");
				}


				for(Integer valeur : vector)
				{
					if(valeur!=null)
						System.out.print(graph.getNodes().get(valeur).getName()+ "\t");
					else
						System.out.print("-"+"\t");
				}
				System.out.println("");
				precedentId=iD;
			}
		}

	}
}
