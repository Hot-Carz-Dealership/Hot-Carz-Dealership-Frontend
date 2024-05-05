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
        color="text.secondary"
        align="center"
        // {...props}
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
