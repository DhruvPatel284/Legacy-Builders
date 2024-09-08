import React from 'react';

const Footer = () => {
  return (
    <div>
        <footer className="mt-12 flex items-center justify-between">
            {/* Footer Text */}
            <p className="text-gray-500 text-sm">
                Made with <span className="text-purple-600">❤️</span> by{" "}
                <span className="text-purple-600">Visily</span>
            </p>

            {/* Footer Buttons */}
            <div className="flex space-x-2">
                <button className="text-purple-600 border border-purple-600 py-1 px-3 rounded hover:bg-purple-50 flex items-center">
                <i className="fas fa-comment-alt mr-2"></i> Message
                </button>
                <button className="text-purple-600 border border-purple-600 py-1 px-3 rounded hover:bg-purple-50 flex items-center">
                <i className="fas fa-heart mr-2"></i> Favorite
                </button>
            </div>
        </footer>
    </div>
    
  );
};

export default Footer;
