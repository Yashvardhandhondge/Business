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

interface CurrentCashflowProps {
  state: { currentCashflow: number }; 
  updateState: (key: string, value: number) => Promise<void>; 
  updateNotes: (key: string, value: string) => Promise<void>
}

const CurrentCashflowCard: React.FC<CurrentCashflowProps> = ({
  state,
  updateState,
  updateNotes
}) => {
  
  const [cashflow, setCashflow] = useState<number>(state.currentCashflow);
  const [notes, setNotes] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleSaveChanges = async () => {
    await updateState("currentCashflow", cashflow);
    await updateNotes("currentCashflow", notes);
    setNotes(""); 
    setIsDialogOpen(false); 
  };

 
  const handleCancel = () => {
    setCashflow(state.currentCashflow); 
    setNotes(""); 
    setIsDialogOpen(false); 
  };

  return (
    <div className="p-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {/* Trigger to open dialog */}
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg">
            <h3 className="text-lg font-semibold">Current Cashflow</h3>
            <p className="text-2xl text-yellow-500">${state.currentCashflow}</p>
          </div>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Current Cashflow</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Input for cashflow */}
            <label className="font-semibold" htmlFor="cashflow">
              Current Cashflow
            </label>
            <Input
              id="cashflow"
              type="number"
              value={cashflow}
              onChange={(e) => setCashflow(Number(e.target.value))}
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

          {/* Action Buttons */}
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

export default CurrentCashflowCard;
