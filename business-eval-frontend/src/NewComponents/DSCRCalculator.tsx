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
  state: any;
  updateState: (key: string, value: number) => void;
}

const DSCRCalculator: React.FC<Props> = ({ state, updateState }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dscrCurrentCashflow, setDscrCurrentCashflow] = useState(state.currentCashflow);
  const [expectedSalary, setExpectedSalary] = useState(state.expectedSalary);
  const [totalDebtPayment, setTotalDebtPayment] = useState(state.totalDebtPayments);
  const [notes, setNotes] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);

  // Calculate DSCR
  const dscr = totalDebtPayment
    ? (dscrCurrentCashflow / totalDebtPayment).toFixed(2)
    : "N/A";

  const handleSaveChanges = () => {
    updateState("currentCashflow", dscrCurrentCashflow);
    updateState("expectedSalary", expectedSalary);
    updateState("totalDebtPayment", totalDebtPayment);
    setShowMessageBox(true);
    setTimeout(() => setShowMessageBox(false), 3000); 
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setDscrCurrentCashflow(state.dscrCurrentCashflow);
    setExpectedSalary(state.expectedSalary);
    setTotalDebtPayment(state.totalDebtPayment);
    setNotes("");
    setIsDialogOpen(false);
  };

  return (
    <div className="p-4">
      {showMessageBox && (
        <div className="absolute top-2 left-2 bg-green-500 text-white p-2 rounded-md shadow-md">
          DSCR Calculator values updated!
        </div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg relative">
            <h3 className="text-lg font-semibold">DSCR Card</h3>
            <p className="text-2xl text-blue-500">{`DSCR: ${state.dscr}`}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit DSCR Calculator</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Input for DSCR Current Cashflow */}
            <label className="font-semibold" htmlFor="dscrCurrentCashflow">
              DSCR Current Cashflow
            </label>
            <Input
              id="currentCashflow"
              type="number"
              value={dscrCurrentCashflow}
              onChange={(e) => setDscrCurrentCashflow(Number(e.target.value))}
              placeholder="Enter DSCR current cashflow"
              className="w-full"
            />

            {/* Input for Expected Salary */}
            <label className="font-semibold" htmlFor="expectedSalary">
              Expected Salary
            </label>
            <Input
              id="expectedSalary"
              type="number"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(Number(e.target.value))}
              placeholder="Enter expected salary"
              className="w-full"
            />

            {/* Input for Total Debt Payment */}
            <label className="font-semibold" htmlFor="totalDebtPayment">
              Total Debt Payment
            </label>
            <Input
              id="totalDebtPayment"
              type="number"
              value={totalDebtPayment}
              onChange={(e) => setTotalDebtPayment(Number(e.target.value))}
              placeholder="Enter total debt payment"
              className="w-full"
            />

            {/* Textarea for Notes */}
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

export default DSCRCalculator;
