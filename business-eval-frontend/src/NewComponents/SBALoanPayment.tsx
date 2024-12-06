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
import useBusinessStore from "@/store/buisnessSrore";

interface Props {
  state: any;
  updateState: (key: string, value: any) => void;
  updateLoanSba: (value: {
    amount: number;
    term: number;
    rate: number;
}) => void
}

const SbaLoanPaymentCard: React.FC<Props> = ({ state, updateState, updateLoanSba }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loanPayment, setLoanPayment] = useState(state.sbaLoanPayment);
  const [loanAmount, setLoanAmount] = useState(state.sbaLoanPayment);
  const [loanRate, setLoanRate] = useState(state.loanRate);
  const [loanTerm, setLoanTerm] = useState(state.loanTerm);
  const [notes, setNotes] = useState([""]);

  const handleSaveChanges = () => {
   
    updateLoanSba({amount: loanAmount, term: loanTerm, rate: loanRate});
    console.log(loanTerm)
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setLoanPayment(state.loanPayment);
    setLoanAmount(state.loanAmount);
    setLoanRate(state.loanRate);
    setLoanTerm(state.loanTerm);
    setNotes([]);
    setIsDialogOpen(false);
  };

  const calculateLoanPayment = () => {
    if (loanAmount && loanRate && loanTerm) {
      const monthlyRate = loanRate / 100 / 12;
      const numberOfPayments = loanTerm * 12;
      const payment =
        loanAmount *
        (monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments)));
      setLoanPayment(parseFloat(payment.toFixed(2)));
    }
  };



  return (
    <div className="p-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg relative">
            <h3 className="text-lg font-semibold">SBA Loan Payment</h3>
            <p className="text-2xl text-blue-500">{`$${state.sbaLoanPayment}`}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit SBA Loan Payment Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="loanAmount">
              Loan Amount
            </label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
              placeholder="Enter Loan Amount"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="loanRate">
              Loan Rate (%)
            </label>
            <Input
              id="loanRate"
              type="number"
              value={loanRate}
              onChange={(e) => setLoanRate(parseFloat(e.target.value))}
              placeholder="Enter Loan Rate"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="loanTerm">
              Loan Term (Years)
            </label>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(parseInt(e.target.value, 10))}
              placeholder="Enter Loan Term"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="loanPayment">
              Monthly Loan Payment (Calculated)
            </label>
            <Input
              id="loanPayment"
              type="number"
              value={loanPayment}
              disabled
              placeholder="Loan payment is auto-calculated"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="notes">
              Notes
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes([...notes,e.target.value])}
              placeholder="Add notes here..."
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                calculateLoanPayment();
                handleSaveChanges();
              }}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SbaLoanPaymentCard;
