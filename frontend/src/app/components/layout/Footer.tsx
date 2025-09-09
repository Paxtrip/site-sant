import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-8">
      <div className="container mx-auto text-center py-4 text-gray-600">
        <p>&copy; {new Date().getFullYear()} Корпоративный портал. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
