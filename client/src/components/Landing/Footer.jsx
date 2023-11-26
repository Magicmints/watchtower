import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-center py-4 text-white">
      © 2023 WatchTower. All rights reserved.
      <br/>
      <span style={{ fontWeight: 'bold', color: 'yellow' }}>Mentor: </span>
      <a 
        href="https://www.linkedin.com/in/mohd-mohsin-4974541bb/" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ fontWeight: 'bold', color: 'yellow' }}
      >
        Mohd Mohsin Sir
      </a>
    </footer>
  );
}

export default Footer;
