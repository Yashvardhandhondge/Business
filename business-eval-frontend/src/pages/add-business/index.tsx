import Navbar from '../../NewComponents/Navbar'
import BusinessList from '../../NewComponents/BusinessList'
import AddBusinessButton from '../../NewComponents/AddBusinessButton'
import { dummyBusinesses } from './dummyData'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <BusinessList initialBusinesses={dummyBusinesses} />
      </main>
      <AddBusinessButton />
    </div>
  )
}

