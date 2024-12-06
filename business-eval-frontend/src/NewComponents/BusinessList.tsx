
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { Business } from 'src/types'

interface BusinessListProps {
  initialBusinesses: Business[]
}

export default function BusinessList({ initialBusinesses }: BusinessListProps) {
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses)

  const handleDelete = (id: string) => {
    setBusinesses(businesses.filter(business => business.id !== id))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businesses.map((business) => (
        <div key={business.id} className="bg-white rounded-lg shadow-md p-6 relative">
          <Link to={`/evaluation/${business.id}`} className="block">
            <h2 className="text-xl font-bold mb-2">{business.name}</h2>
            <p className="text-gray-600 mb-1">
              Asking Price: ${business.askingPrice.toLocaleString()}
            </p>
            <p className="text-gray-600">
              Cashflow: ${business.cashflow.toLocaleString()}
            </p>
          </Link>
          <button
            onClick={() => handleDelete(business.id)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            aria-label="Delete business"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  )
}

