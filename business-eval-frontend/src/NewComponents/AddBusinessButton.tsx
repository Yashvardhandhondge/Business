

import {Link} from 'react-router-dom'

export default function AddBusinessButton() {
  return (
    <Link to="/evaluation/new" className="fixed bottom-8 right-8">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full shadow-lg"
        aria-label="Add new business"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </Link>
  )
}

