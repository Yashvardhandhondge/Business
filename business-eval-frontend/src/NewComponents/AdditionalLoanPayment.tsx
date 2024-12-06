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
  updateAdditionalLoan: (value: { amount: number; term: number; rate: number }) => void;
}

const AdditionalLoanPayment: React.FC<Props> = ({ state, updateState, updateAdditionalLoan }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [additionalLoanPayment, setAdditionalLoanPayment] = useState(state.additionalLoanPayment);
  const [additionalLoanAmount, setAdditionalLoanAmount] = useState(state.additionalLoanAmount);
  const [additionalLoanRate, setAdditionalLoanRate] = useState(state.additionalLoanRate);
  const [additionalLoanTerm, setAdditionalLoanTerm] = useState(state.additionalLoanTerm);
  const [notes, setNotes] = useState("");

  const handleSaveChanges = () => {
    updateAdditionalLoan({ amount: additionalLoanAmount, term: additionalLoanTerm, rate: additionalLoanRate });
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setAdditionalLoanPayment(state.additionalLoanPayment);
    setAdditionalLoanAmount(state.additionalLoanAmount);
    setAdditionalLoanRate(state.additionalLoanRate);
    setAdditionalLoanTerm(state.additionalLoanTerm);
    setNotes("");
    setIsDialogOpen(false);
  };

  return (
    <div className="p-4">
      {/* <MessageCircle className="absolute top-2 right-2 text-xl text-gray-500"/> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg relative">
            <h3 className="text-lg font-semibold">Additional Loan Payment</h3>
            <p className="text-2xl text-blue-500">{`$${state.additionalLoanPayment} `}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Additional Loan Payment Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="additionalLoanPayment">
              Additional Loan Payment
            </label>
            <Input
              id="additionalLoanPayment"
              type="number"
              value={additionalLoanPayment}
              onChange={(e) => setAdditionalLoanPayment(parseFloat(e.target.value))}
              placeholder="Enter Additional Loan Payment"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="additionalLoanAmount">
              Additional Loan Amount
            </label>
            <Input
              id="additionalLoanAmount"
              type="number"
              value={additionalLoanAmount}
              onChange={(e) => setAdditionalLoanAmount(parseFloat(e.target.value))}
              placeholder="Enter Loan Amount"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="additionalLoanRate">
              Additional Loan Rate (%)
            </label>
            <Input
              id="additionalLoanRate"
              type="number"
              value={additionalLoanRate}
              onChange={(e) => setAdditionalLoanRate(parseFloat(e.target.value))}
              placeholder="Enter Loan Rate"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="additionalLoanTerm">
              Additional Loan Term (Years)
            </label>
            <Input
              id="additionalLoanTerm"
              type="number"
              value={additionalLoanTerm}
              onChange={(e) => setAdditionalLoanTerm(parseFloat(e.target.value))}
              placeholder="Enter Loan Term"
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

export default AdditionalLoanPayment;
