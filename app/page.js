"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography } from "@mui/material";

export default function Home() {
	const [inventory, setInventory] = useState([]); //state variable to store inventory
	const [open, setOpen] = useState(false); //this is how we are going to add or remove stuff
	const [itemName, setItemName] = useState(""); //this is where we store what we type

	//async means it wont block our code when fetching
	const updateInventory = async () => {};

	return (
		<Box>
			<Typography variant="h1">Inventory Management</Typography>
		</Box>
	);
}
