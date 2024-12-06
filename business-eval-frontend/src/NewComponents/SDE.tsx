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
// import { MessageCircle } from "lucide-react";

interface Props {
  state: any;
  updateState: (key: string, value: number) => void;
}

const SDE: React.FC<Props> = ({ state, updateState }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sde, setSDE] = useState(state.sde);
  const [notes, setNotes] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);

  const handleSaveChanges = () => {
    updateState("sde", sde);
    setShowMessageBox(true); 
    setTimeout(() => setShowMessageBox(false), 3000); 
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setSDE(state.sde);
    setNotes("");
    setIsDialogOpen(false);
  };

  return (
    <div className="p-4 relative">
      {showMessageBox && (
        <div className="absolute top-2 left-2 bg-green-500 text-white p-2 rounded-md shadow-md">
          SDE Value has been updated!
        </div>
      )}
      {/* <MessageCircle className="absolute top-2 right-2 text-xl text-gray-500" /> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg relative">
            <h3 className="text-lg font-semibold">SDE Value</h3>
            <p className="text-2xl text-blue-500">{`$${state.sde}`}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit SDE Value</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="sde">
              SDE Value
            </label>
            <Input
              id="sde"
              type="number"
              value={sde}
              onChange={(e) => setSDE(Number(e.target.value))}
              placeholder="Enter SDE value"
              className="w-full"
            />
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
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SDE;
