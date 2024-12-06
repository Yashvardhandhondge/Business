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

const TotalDebtPayments: React.FC<Props> = ({ state, updateState }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [totalDebtPayments, setTotalDebtPayments] = useState(state.totalDebtPayments);
  const [sbaLoanPayment, setSbaLoanPayment] = useState(state.sbaLoanPayment);
  const [additionalLoanPayment, setAdditionalLoanPayment] = useState(state.additionalLoanPayment);
  const [notes, setNotes] = useState("");

  const handleSaveChanges = () => {
    updateState("totalDebtPayments", totalDebtPayments);
    updateState("sbaLoanPayment", sbaLoanPayment);
    updateState("additionalLoanPayment", additionalLoanPayment);
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setTotalDebtPayments(state.totalDebtPayments);
    setSbaLoanPayment(state.sbaLoanPayment);
    setAdditionalLoanPayment(state.additionalLoanPayment);
    setNotes("");
    setIsDialogOpen(false);
  };

  return (
    <div className="p-4">
      {/* <MessageCircle className="absolute top-2 right-2 text-xl text-gray-500"/> */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg relative">
            <h3 className="text-lg font-semibold">Total Debt Payments</h3>
            <p className="text-2xl text-blue-500">{`$${state.totalDebtPayments} `}</p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Total Debt Payments Card</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="totalDebtPayments">
              Total Debt Payments
            </label>
            <Input
              id="totalDebtPayments"
              type="number"
              value={totalDebtPayments}
              onChange={(e) => setTotalDebtPayments(parseFloat(e.target.value))}
              placeholder="Enter Total Debt Payments"
              className="w-full"
            />
            <label className="font-semibold" htmlFor="sbaLoanPayment">
              SBA Loan Payment
            </label>
            <Input
              id="sbaLoanPayment"
              type="number"
              value={sbaLoanPayment}
              onChange={(e) => setSbaLoanPayment(parseFloat(e.target.value))}
              placeholder="Enter SBA Loan Payment"
              className="w-full"
            />
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

export default TotalDebtPayments;
