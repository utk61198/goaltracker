import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

function StickyFooter() {
  return (
    <footer className='footer mt-auto py-3 bg-dark text-white'>
    <div style={{
        padding: "60px 15px 0",
    }}>Place sticky footer content here.</div>
  </footer>
  );
}


export default StickyFooter