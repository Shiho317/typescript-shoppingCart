import { useState } from 'react';
import { useQuery } from 'react-query';
import Drawer from '@mui/material/Drawer';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import { Wrapper, StyledButton } from './App.style';
import Item from './Item/Item';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> => 
  await (await fetch('https://fakestoreapi.com/products')).json();


const App = () => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  
  const getTotalItems = (items: CartItemType[]) => 
  items.reduce((acc: number, items) => acc + items.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => null;

  if(isLoading) return <LinearProgress/>;
  if(error) return <div>Something gone wrong...</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={isCartOpen} onClose={() => setIsCartOpen(false)}>
        Cart goes here
      </Drawer>
      <StyledButton onClick={() => setIsCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon/>
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item 
            item={item}
            handleAddToCart={handleAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
