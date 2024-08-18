import React from "react";
import "./footbar.css";

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-item">
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
        <div className="footer-item">
          <a href="https://twitter.com/yourtwitterhandle" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>
        <div className="footer-item">
          <a href="https://www.linkedin.com/in/yourlinkedinhandle" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};