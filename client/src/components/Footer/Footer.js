import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./Footer.css";

function Footer() {
  return (
    <main>
      <div className="sticky-footer">
        <div className="socialMedia">
          <InstagramIcon /> <TwitterIcon /> <FacebookIcon /> <LinkedInIcon />
        </div>
        <p> &copy; 2022 ludensplataform.com</p>
      </div>
    </main>
  );
}

export default Footer;
