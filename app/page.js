"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography } from "@mui/material";
import { collection, query } from "firebase/firestore";

export default function Home() {
	const [inventory, setInventory] = useState([]); //state variable to store inventory
	const [open, setOpen] = useState(false); //this is how we are going to add or remove stuff
	const [itemName, setItemName] = useState(""); //this is where we store what we type

	//async means it wont block our code when fetching; if blocked, entire website freezes
	const updateInventory = async () => {
		//get snapshots of the collection (database); done so by doing a query from firebase
		const snapshot = query(collection(firestore, "inventory"));
	};

	return (
		<Box>
			<Typography variant="h1">Inventory Management</Typography>
		</Box>
	);
}
