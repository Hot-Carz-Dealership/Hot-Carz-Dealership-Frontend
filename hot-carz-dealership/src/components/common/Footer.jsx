import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Footer = ({ children }) => {
  console.log(children);

  return (
    <footer className="text-white footer" sx={{ mt: 5 }}>
      {children}

      <Typography
        variant="body2"
        // color="text.secondary"
        align="center"
        sx={{ mt: 2 }} // Add margin top for separation
      >
        Address: 1600 Pennsylvania Avenue NW, Washington, D.C.
        <br />
        Hours of Operations: Sat-Sun: 9am-7pm
        <br />
        Phone: +1 (123) 456-7890
      </Typography>

      <Typography
        variant="body2"
        // color="text.secondary"
        align="center"
        sx={{ mt: 2 }} // Add margin top for separation
      >
        {"Copyright © "}
        <Link className="text-white" href="/">
          Hot Carz
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
};

export default Footer;
