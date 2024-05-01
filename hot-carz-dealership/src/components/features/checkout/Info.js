import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

function Info({ data }) {
  const { cart } = data;

  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary">
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {`$${data["Grand Total"]}`}
      </Typography>
      <List disablePadding>
        {cart.map((item, index) => (
          <ListItem key={index} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={item.item_name}
              secondary={item.VIN_carID ? `VIN: ${item.VIN_carID}` : null}
            />
            <Typography variant="body1" fontWeight="medium">
              {item.item_price === "0.00" ? "Free" : `$${item.item_price}`}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

// Info.propTypes = {
//   data: PropTypes.object.isRequired,
// };

export default Info;
