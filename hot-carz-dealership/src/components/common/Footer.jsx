import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Footer = () => {
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link className="text-white" href="/">
          Hot Carz
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <footer className="footer">
      {" "}
      <Copyright className="text-white" sx={{ mt: 5 }} />{" "}
    </footer>
  );
};

export default Footer;
