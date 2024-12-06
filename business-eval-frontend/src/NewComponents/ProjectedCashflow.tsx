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
// import { MessageCircle } from 'lucide-react';

interface Props {
  state: any;
  updateState: (key: string, value: number) => void;
}

const ProjectedCashflowCard: React.FC<Props> = ({ state, updateState }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [projectedCashflow, setProjectedCashflow] = useState(state.projectedCashflow);
  const [currentCashflow, setCurrentCashflow] = useState(state.currentCashflow);
  const [totalDebtPayments, setTotalDebtPayments] = useState(state.totalDebtPayments);
  const [notes, setNotes] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);

  const handleSaveChanges = () => {
    updateState("projectedCashflow", projectedCashflow);
    updateState("currentCashflow", currentCashflow);
    updateState("totalDebtPayments", totalDebtPayments);
    setShowMessageBox(true); 
    setTimeout(() => setShowMessageBox(false), 3000); 
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setProjectedCashflow(state.projectedCashflow);
    setCurrentCashflow(state.currentCashflow);
    setTotalDebtPayments(state.totalDebtPayments);
    setNotes("");
    setIsDialogOpen(false);
  };

  return (
    <div className="p-4">
      {/* <MessageCircle className="absolute top-2 right-2 text-xl text-gray-500"/> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg relative">
            <h3 className="text-lg font-semibold">Projected Cashflow</h3>
            <p className="text-2xl text-blue-500">{` $${state.projectedCashflow} `}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Projected Cashflow Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="projectedCashflow">
              Projected Cashflow
            </label>
            <Input
              id="projectedCashflow"
              type="number"
              value={projectedCashflow}
              onChange={(e) => setProjectedCashflow(Number(e.target.value))}
              placeholder="Enter projected cashflow"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="currentCashflow">
              Current Cashflow
            </label>
            <Input
              id="currentCashflow"
              type="number"
              value={currentCashflow}
              onChange={(e) => setCurrentCashflow(Number(e.target.value))}
              placeholder="Enter current cashflow"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="totalDebtPayments">
              Total Debt Payments
            </label>
            <Input
              id="totalDebtPayments"
              type="number"
              value={totalDebtPayments}
              onChange={(e) => setTotalDebtPayments(Number(e.target.value))}
              placeholder="Enter total debt payments"
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
            <Button onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectedCashflowCard;
