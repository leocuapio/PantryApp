'use client';

import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { firestore } from '@/firebase';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { styled } from '@mui/system';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const Background = styled('div')({
  position: 'fixed',
  width: '100%',
  height: '100%',
  background: 'url(/pine.jpg) no-repeat center center fixed',
  backgroundSize: 'cover',
  zIndex: -1,
});

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
    setFilteredInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = inventory;
    if (searchQuery) {
      filtered = filtered.filter(({ name }) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter === 'low') {
      filtered = filtered.filter(({ quantity }) => quantity <= 5);
    } else if (filter === 'high') {
      filtered = filtered.filter(({ quantity }) => quantity > 5);
    }
    setFilteredInventory(filtered);
  }, [searchQuery, filter, inventory]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) return <div>Loading...</div>;

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
      padding={2}
    >
      <Background /> {/* Add Background Component Here */}
      <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
        PantryBud
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" sx={{ backgroundColor: '#2B2B2B', color: 'white' }} onClick={handleOpen}>
          Add
        </Button>
        <Button variant="contained" sx={{ backgroundColor: '#2B2B2B', color: 'white' }} onClick={() => removeItem(itemName)}>
          Remove
        </Button>
      </Stack>
      <Stack direction="row" spacing={3} width="100%" maxWidth="1200px">
        <Stack width="30%" spacing={2}>
          <TextField
            label="Search Items"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            margin="normal"
          />
          <FormControl fullWidth sx={{ mt: 2 }}> {/* Adjusted margin top */}
            <InputLabel>Filter</InputLabel>
            <Select
              value={filter}
              label="Filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="low">Low Quantity</MenuItem>
              <MenuItem value="high">High Quantity</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Box flex={1} border={'1px solid #333'} bgcolor={'#f0f0f0'} padding={2} borderRadius={1}>
          <Box
            width="100%"
            height="100px"
            bgcolor={'#2B2B2B'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant={'h5'} color={'white'} textAlign={'center'}>
              Inventory Items
            </Typography>
          </Box>
          <Stack spacing={2} height="300px" overflow={'auto'} padding={2}>
            {filteredInventory.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                minHeight="100px"
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                bgcolor={'#fff'}
                paddingX={2}
                borderRadius={1}
                boxShadow={1}
              >
                <Typography variant={'h6'} color={'#333'}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant={'h6'} color={'#333'}>
                  {quantity}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" sx={{ backgroundColor: '#2B2B2B', color: 'white' }} onClick={() => addItem(name)}>
                    ADD
                  </Button>
                  <Button variant="contained"  sx={{ backgroundColor: '#2B2B2B', color: 'white' }} onClick={() => removeItem(name)}>
                    Remove
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              sx={{ backgroundColor: '#2B2B2B', color: 'white' }}
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}