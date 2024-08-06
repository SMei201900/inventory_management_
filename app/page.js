"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography } from "@mui/material";
import { collection, getDocs, query } from "firebase/firestore";

export default function Home() {
	const [inventory, setInventory] = useState([]); //state variable to store inventory
	const [open, setOpen] = useState(false); //this is how we are going to add or remove stuff
	const [itemName, setItemName] = useState(""); //this is where we store what we type

	//async means it wont block our code when fetching; if blocked, entire website freezes
	const updateInventory = async () => {
		//get snapshots of the collection (database); done so by doing a query from firebase
		const snapshot = query(collection(firestore, "inventory"));
		//now we want to fetch the documents INSIDE the collection
		const docs = await getDocs(snapshot);
		const inventoryList = [];

		//for every element in docs --> docs.forEach
		//for every doc, we want to add it into our inventoryList
		docs.forEach((doc) => {
			inventoryList.push({
				//we want to push a new object
				name: doc.id, //where the name of it is the id of the doc
				...doc.data(),
			});
		});
		setInventory(inventoryList);
	};

	//this runs the updateInventory code for whenever the [] changes
	useEffect(() => {
		updateInventory();
	}, []);
	//[] here is a dependency array; when empty it means we only run once aka when the page loads

	return (
		<Box>
			<Typography variant="h1">Inventory Management</Typography>
			{inventory.forEach((item) => {
				return (
					<>
						{item.name}
						{item.count}
					</>
				);
			})}
		</Box>
	);
}
