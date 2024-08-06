"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography } from "@mui/material";
import { collection, getDoc, getDocs, query } from "firebase/firestore";

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

	const addItem = async (item) => {
		const docRef = doc(collection(firestore, "inventory"), item);
		const docSnap = await getDoc(docRef);
		//here we are writing that if it exists, we add 1
		if (docSnap.exists()) {
			const { quantity } = docSnap.data();
			await setDoc(docRef, { quantity: quantity + 1 });
		} else {
			await setDoc(docRef, { quantity: 1 });
		}
		//else we do nothing
		await updateInventory;
	};

	const removeItem = async (item) => {
		//This allows us to get a direct item reference
		const docRef = doc(collection(firestore, "inventory"), item);
		//Now we want a snapshot of this so we do getDoc
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const { quantity } = docSnap.data();
			//if quantity equals to 1, we delete it
			if (quantity === 1) {
				await deleteDoc(docRef);
			} else {
				await setDoc(docRef, { quantity: quantity - 1 });
			}
		}
		await updateInventory;
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
				console.log(inventoryList);
				return (
					<Box>
						{item.name}
						{item.count}
					</Box>
				);
			})}
		</Box>
	);
}
