"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import {
	Box,
	Modal,
	Typography,
	Stack,
	TextField,
	Button,
} from "@mui/material";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";

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

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box
			width="100vw"
			height="100vw"
			display="flex"
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			gap={2}
		>
			<Modal open={open} onClose={handleClose}>
				<Box
					position="absolute"
					top="50%"
					left="50%"
					width={400}
					bgcolor="white"
					border="2px solid #000"
					boxShadow={24}
					p={4}
					display="flex"
					flexDirection="column"
					gap={3}
					sx={{
						transform: "translate(-50%,-50%)",
					}}
				>
					<Typography variant="h6">Add Item</Typography>
					<Stack width="100%" direction="row" spacing={2}>
						<TextField
							variant="outlined"
							fullWidth
							value={itemName}
							onChange={(e) => {
								setItemName(e.target.value);
							}}
						/>
						<Button
							variant="outlined"
							onClick={() => {
								addItem(itemName);
								setItemName("");
								handleClose();
							}}
						>
							Add
						</Button>
					</Stack>
				</Box>
			</Modal>
			<Button
				variant="contained"
				onClick={() => {
					handleOpen();
				}}
			>
				Add New Item
			</Button>
			<Box border="1px solid #333">
				<Box
					width="800px"
					height="100px"
					bgcolor="#ADD8E6"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Typography variant="h2" color="#333">
						Inventory Items
					</Typography>
				</Box>
			</Box>
			<Stack width="800px" height="300px" spacing={2} overflow="auto">
				{inventory.map(({ name, quantity }) => (
					<Box
						key={name}
						width="100%"
						minHeight="150px"
						display="flex"
						alignItems="center"
						justifyContent="center"
						bgColor="#f0f0f0"
						padding={5}
					>
						<Typography>{name}</Typography>
					</Box>
				))}
			</Stack>
		</Box>
	);
}
