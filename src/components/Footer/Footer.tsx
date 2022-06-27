import React from "react";
import GithubIcon from "../../assets/img/socials/github.png";
function Footer() {
  return (
    <>
      <div className="flex justify-between bg-slate-100 py-5 px-5 items-center">
        <div>
          <p>Akka | Free to use</p>
        </div>

        <ul className="wrapper">
          <li className="icon facebook">
            <span className="tooltip">Facebook</span>
            <span>
              <i className="fab fa-facebook-f"></i>
            </span>
          </li>
          <li className="icon twitter">
            <span className="tooltip">Twitter</span>
            <span>
              <i className="fab fa-twitter"></i>
            </span>
          </li>
          <li className="icon instagram">
            <span className="tooltip">Instagram</span>
            <span>
              <i className="fab fa-instagram"></i>
            </span>
          </li>
          <li className="icon github">
            <span className="tooltip">Github</span>
            <span>
              <img src={GithubIcon} alt="" />
            </span>
          </li>
          <li className="icon youtube">
            <span className="tooltip">Youtube</span>
            <span>
              <i className="fab fa-youtube"></i>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Footer;
