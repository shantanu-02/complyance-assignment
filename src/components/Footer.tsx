import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">About Us</a></li>
              <li><a href="#" className="hover:text-gray-400">Careers</a></li>
              <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-400">FAQ</a></li>
              <li><a href="#" className="hover:text-gray-400">Help Center</a></li>
              <li><a href="#" className="hover:text-gray-400">Returns</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-400"><i className="fab fa-facebook-f"></i> Facebook</a></li>
              <li><a href="#" className="hover:text-gray-400"><i className="fab fa-twitter"></i> Twitter</a></li>
              <li><a href="#" className="hover:text-gray-400"><i className="fab fa-linkedin-in"></i> LinkedIn</a></li>
              <li><a href="#" className="hover:text-gray-400"><i className="fab fa-instagram"></i> Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2024 Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
