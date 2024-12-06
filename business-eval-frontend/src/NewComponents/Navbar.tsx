

import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
//  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    console.log('Logging out...')
     navigate('/login')
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" >
            <div className='className="text-xl font-bold text-gray-800"'>
              Business Evaluation Manager
              </div>
            </Link>
          </div>
          <div className="ml-3 relative">
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="user-menu"
                aria-haspopup="true"
              >
                <span className="sr-only">Open user menu</span>
                <span className="text-gray-700">John Doe</span>
              </button>
            </div>
            {isOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

