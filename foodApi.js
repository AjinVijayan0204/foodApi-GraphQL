import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//const typeDefs = gql`

const typeDefs = `#graphql

	type Food{

		id: ID!
		name: String
		veg: Boolean
		imgUrl: String
	
	}
	
	type Query{
	
		foods: [Food]
		foodByName(name:String): Food
	}
	
	type Mutation{
		addFood(name:String, veg:Boolean): Food
		addFoodWithImage(name:String, veg:Boolean, imgUrl:String): [Food]
	}
`;

var foodArray = [

	{
		id: 1,
		name: "Dosa",
		veg: true,
		imgUrl: "https://image.shutterstock.com/image-photo/south-indian-food-crispy-masala-260nw-2135616403.jpg"
	},
	
	{
		id: 2,
		name: "Idly",
		veg: true,
		imgUrl: "https://image.shutterstock.com/image-photo/idly-idli-south-indian-main-260nw-1932835511.jpg"
	},
	
	{
		id: 3,
		name: "Biriyani",
		veg: false,
		imgUrl: "https://image.shutterstock.com/image-photo/chicken-dhum-biriyani-using-jeera-260nw-2047827035.jpg"
	},
	
];


const resolvers = {
	
	Query: {
	
		foods(){
			return foodArray;
		},
		
		foodByName(parent,args,context,info){
			return foodArray.find((foodArray)=>foodArray.name===args.name)
		}
	},
	
	Mutation: {
		addFood(parent, args, context, info){
			const food = {
				id: foodArray.length+1,
				name: args.name,
				vegs: args.veg,
				imgUrl:""
			};
			foodArray.push(food);
			return food;
		},
		
		addFoodWithImage(parent, args, context, info){
			const food ={
				id: foodArray.length+1,
				name:args.name,
				veg:args.veg,
				imgUrl: args.imgUrl
			};
			foodArray.push(food);
			return foodArray;
		}
	},
	
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);