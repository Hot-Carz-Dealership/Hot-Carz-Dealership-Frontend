import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../utilities/constants";
import PropTypes from "prop-types";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));
function Review({ cartData, handleCustomerSignature }) {
  const [customerFullName, setCustomerFullName] = useState("");
  const [hasCustomerName, setHasCustomerName] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/@me`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          // setUserData(userData);
          const fullName = `${userData.first_name} ${userData.last_name}`;
          setCustomerFullName(fullName);
          // Check if the input already has the customer's name exactly
          setHasCustomerName(fullName === inputRef.current.value);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const inputRef = React.useRef(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    // Update hasCustomerName based on whether the input value matches customerFullName
    setHasCustomerName(inputValue === customerFullName);
    handleCustomerSignature(inputValue === customerFullName);
  };

  // const handleNameChange = (event) => {
  //   const { name, value } = event.target;
  //   setCustomerName((prevNames) => ({
  //     ...prevNames,
  //     [name]: value,
  //   }));
  // };

  if (!cartData || !cartData.cart || cartData.cart.length === 0) {
    return <Typography variant="body1">No items in cart</Typography>;
  }

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <Stack spacing={2}>
          <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary="Order Subtotal"
                secondary={`${cartData.cart.length} selected`}
              />
              <Typography variant="body2">
                ${parseFloat(cartData["Subtotal"]).toFixed(2)}
              </Typography>
            </ListItem>

            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Taxes" secondary="5% of Order Subtotal" />
              <Typography variant="body2">
                ${parseFloat(cartData["Taxes"]).toFixed(2)}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary="Grand Total"
                secondary="Includes taxes and fees"
              />
              <Typography variant="body2">
                ${parseFloat(cartData["Grand Total"]).toFixed(2)}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText
                primary="Financed Amount"
                secondary="Amount financed through financing plan"
              />
              <Typography variant="body2">
                {" "}
                ${parseFloat(cartData["Financed Amount"]).toFixed(2)}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary=" Amount Due Today" secondary="" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                ${parseFloat(cartData["Amount Due Now"]).toFixed(2)}
              </Typography>
            </ListItem>
          </List>
        </Stack>
      </List>
      <Divider />
      <Stack direction="column" spacing={2} sx={{ my: 2 }}>
        <Typography variant="subtitle2">Customer Signature:</Typography>
        <FormGrid sx={{ flexGrow: 1 }}>
          <OutlinedInput
            id="customer-signature"
            autoComplete="customer-signature"
            placeholder={`Sign Here: ${customerFullName}`}
            error={!hasCustomerName}
            // value={customerFullName}
            ref={inputRef}
            onChange={handleInputChange}
            // Add necessary props and event handlers
          />
        </FormGrid>
      </Stack>
    </Stack>
  );
}

Review.propTypes = {
  cartData: PropTypes.object.isRequired,
};

export default Review;
