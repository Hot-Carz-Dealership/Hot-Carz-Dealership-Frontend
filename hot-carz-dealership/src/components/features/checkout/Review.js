import * as React from "react";
import PropTypes from "prop-types";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Review({ cartData }) {
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
        <Typography variant="subtitle2" gutterBottom>
          Signatures
        </Typography>

        <Typography variant="body1">
          Manager Approval Signature: $Replace With Manger
        </Typography>
        <Typography variant="body1">
          Customer Signature: Replace with textbox
        </Typography>
      </Stack>
    </Stack>
  );
}

Review.propTypes = {
  cartData: PropTypes.object.isRequired,
};

export default Review;
