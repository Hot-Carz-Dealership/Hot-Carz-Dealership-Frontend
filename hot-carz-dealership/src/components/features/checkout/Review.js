// import * as React from "react";

// import Divider from "@mui/material/Divider";
// import Grid from "@mui/material/Grid";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";

// const payments = [
//   { name: "Card type:", detail: "Visa" },
//   { name: "Card holder:", detail: "Mr. John Smith" },
//   { name: "Card number:", detail: "xxxx-xxxx-xxxx-1234" },
//   { name: "Expiry date:", detail: "04/2024" },
// ];

// export default function Review() {
//   return (
//     <Stack spacing={2}>
//       <List disablePadding>
//         <ListItem sx={{ py: 1, px: 0 }}>
//           <ListItemText primary="Products" secondary="4 selected" />
//           <Typography variant="body2">$134.98</Typography>
//         </ListItem>
//         <ListItem sx={{ py: 1, px: 0 }}>
//           <ListItemText primary="Shipping" secondary="Plus taxes" />
//           <Typography variant="body2">$9.99</Typography>
//         </ListItem>
//         <ListItem sx={{ py: 1, px: 0 }}>
//           <ListItemText primary="Total" />
//           <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
//             $144.97
//           </Typography>
//         </ListItem>
//       </List>
//       <Divider />
//       <Stack
//         direction="column"
//         divider={<Divider flexItem />}
//         spacing={2}
//         sx={{ my: 2 }}
//       >
//         <div>
//           <Typography variant="subtitle2" gutterBottom>
//             Payment details
//           </Typography>
//           <Grid container>
//             {payments.map((payment) => (
//               <React.Fragment key={payment.name}>
//                 <Stack
//                   direction="row"
//                   spacing={1}
//                   useFlexGap
//                   sx={{ width: "100%", mb: 1 }}
//                 >
//                   <Typography variant="body1" color="text.secondary">
//                     {payment.name}
//                   </Typography>
//                   <Typography variant="body2">{payment.detail}</Typography>
//                 </Stack>
//               </React.Fragment>
//             ))}
//           </Grid>
//         </div>
//       </Stack>
//     </Stack>
//   );
// }

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
