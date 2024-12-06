import React, { useState } from "react"; 
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  state: any; // Parent state containing askingPrice
  updateState: (key: string, value: number) => void; 
  updateNotes: (key: string, value: string) => void// Function to update parent state
}

const AskingPriceCard: React.FC<Props> = ({ state, updateState }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility state
  const [askingPrice, setAskingPrice] = useState(state.askingPrice); // Local asking price state
  const [notes, setNotes] = useState(""); // Notes input state
  const [showMessageBox, setShowMessageBox] = useState(false); // Success message visibility state

  // Save changes and update parent state
  const handleSaveChanges = () => {
    updateState("askingPrice", askingPrice); // Update askingPrice in parent state
    setShowMessageBox(true); // Show success message
    setTimeout(() => setShowMessageBox(false), 3000); // Auto-hide after 3 seconds
    setIsDialogOpen(false); // Close dialog
  };

  // Reset changes and close dialog
  const handleCancel = () => {
    setAskingPrice(state.askingPrice); // Revert to parent state value
    setNotes(""); // Clear notes
    setIsDialogOpen(false); // Close dialog
  };

  return (
    <div className="p-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Trigger to open dialog */}
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg relative">
            <h3 className="text-lg font-semibold">Asking Price</h3>
            <p className="text-2xl text-green-500">{`$${state.askingPrice}`}</p>
          </div>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Asking Price</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Input for asking price */}
            <label className="font-semibold" htmlFor="askingPrice">
              Asking Price
            </label>
            <Input
              id="askingPrice"
              type="number"
              value={askingPrice}
              onChange={(e) => setAskingPrice(Number(e.target.value))}
              placeholder="Enter asking price"
              className="w-full"
            />

            {/* Textarea for notes */}
            <label className="font-semibold" htmlFor="notes">
              Notes
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes here..."
              className="w-full"
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Message Box */}
      {showMessageBox && (
        <div className="absolute top-4 right-4 bg-green-100 text-green-800 p-2 rounded-md shadow-lg">
          Asking Price updated successfully!
        </div>
      )}
    </div>
  );
};

export default AskingPriceCard;
