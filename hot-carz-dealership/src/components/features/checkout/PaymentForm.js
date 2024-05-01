import * as React from "react";

import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { styled } from "@mui/system";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function PaymentForm({
  onRoutingNumberChange,
  onAccountNumberChange,
}) {
  const paymentType = "bankTransfer";
  const [routingNumber, setRoutingNumber] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [routingValid, setRoutingValid] = React.useState(false);
  const [accountValid, setAccountValid] = React.useState(false);
  const [routingError, setRoutingError] = React.useState("");
  const [accountError, setAccountError] = React.useState("");

  const handleRoutingNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    setRoutingNumber(value);

    if (/^\d{9}$/.test(value)) {
      onRoutingNumberChange(value); // Call callback function from props
      setRoutingValid(true);
      setRoutingError("");
    } else {
      setRoutingValid(false);
      setRoutingError("Routing number must be 9 digits");
      onRoutingNumberChange(null);
    }
  };

  const handleAccountNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    setAccountNumber(value);

    if (/^\d{8,12}$/.test(value)) {
      onAccountNumberChange(value); // Call callback function from props
      setAccountValid(true);
      setAccountError("");
    } else {
      setAccountValid(false);
      setAccountError("Account number must be between 8 and 12 digits");
      onAccountNumberChange(null);
    }
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      {paymentType === "bankTransfer" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              width: "100%",
              borderRadius: "20px",
              border: "1px solid ",
              borderColor: "divider",
              backgroundColor: "background.paper",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle2">Bank transfer</Typography>
              <AccountBalanceRoundedIcon sx={{ color: "text.secondary" }} />
            </Box>
            <AccountBalanceRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                color: "text.secondary",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="routing-number" required>
                  Routing number
                </FormLabel>
                <OutlinedInput
                  id="routing-number"
                  autoComplete="routing-number"
                  placeholder="123456789"
                  error={!routingValid}
                  required
                  value={routingNumber}
                  onChange={handleRoutingNumberChange}
                  inputProps={{ maxLength: 9 }}
                />
                {routingError && (
                  <Typography variant="body2" color="error">
                    {routingError}
                  </Typography>
                )}
              </FormGrid>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="account-number" required>
                  Account number
                </FormLabel>
                <OutlinedInput
                  id="account-number"
                  autoComplete="account-number"
                  placeholder="0123456789"
                  error={!accountValid}
                  required
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  inputProps={{ maxLength: 12 }}
                />
                {accountError && (
                  <Typography variant="body2" color="error">
                    {accountError}
                  </Typography>
                )}
              </FormGrid>
            </Box>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
