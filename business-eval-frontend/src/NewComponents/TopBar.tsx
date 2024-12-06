
import * as React from "react"
import { ArrowLeft, LinkIcon, Pencil, Upload } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"

export default function TopBar({data}:{
  data:any
}) {
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State to control the modal
  const [isEditingNotes, setIsEditingNotes] = React.useState(false); // State to control the notes input box
  const [notes, setNotes] = React.useState(""); // State to store notes text
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      console.log("Selected file:", file.name)
    }
  }

  const openModal = () => {
    setIsModalOpen(true); 
  }

  const closeModal = () => {
    setIsModalOpen(false); 
  }

  const toggleEditNotes = () => {
    setIsEditingNotes((prev) => !prev); 
  }

  const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value); 
  }

  return (
    <div className="bg-slate-50">
      <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-white px-4">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-base font-normal">{data?.business_name}</h1>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={openModal}>
          <LinkIcon className="h-4 w-4" />
          <span className="sr-only">Share or copy link</span>
        </Button>
      </header>

      <main className="p-4">
        <Card className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-8 w-8"
            onClick={toggleEditNotes}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <CardHeader>
            <CardTitle>{data?.business_name}</CardTitle>
            <p className="text-sm text-muted-foreground">{data?.business_name}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Link
                to="https://www.test.com"
                className="text-sm text-blue-600 hover:underline"
              >
                {data?.business_url}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 p-0"
                onClick={handleUploadClick}
              >
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload image</span>
              </Button>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                Researching
              </Badge>
              <p className="text-sm text-muted-foreground">
                Updated 2 hours ago
              </p>
            </div>
            {/* Conditionally render the notes input box */}
            {isEditingNotes ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={notes}
                  onChange={handleNotesChange}
                  placeholder="Add your notes here"
                  className="p-2 border rounded-md w-full"
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{notes || "No notes yet."}</p>
            )}
          </CardContent>
        </Card>
      </main>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Modal for the Attachments */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Attachments</h2>
              <Button variant="ghost" size="icon" onClick={closeModal}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">No attachments available.</p>
              {/* You can later add the attachments dynamically here */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
