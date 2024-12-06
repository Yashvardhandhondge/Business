import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react'; // For the delete icon

interface Props {
  state: any;
  updateState: (key: string, value: any) => void;
  deleteCard: (id: string) => void; // Pass a delete function as prop
}

const MetricCard: React.FC<Props> = ({ state, updateState, deleteCard }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [metricName, setMetricName] = useState(state.metricName || "");
  const [metricValue, setMetricValue] = useState(state.metricValue || "");
  const [metricType, setMetricType] = useState(state.metricType || "$");
  const [notes, setNotes] = useState(state.notes || "");

  const handleSaveChanges = () => {
    updateState(state.id, { metricName, metricValue, metricType, notes });
    setIsDialogOpen(false);
  };

  const handleCancel = () => {
    setMetricName(state.metricName);
    setMetricValue(state.metricValue);
    setMetricType(state.metricType);
    setNotes(state.notes);
    setIsDialogOpen(false);
  };

  return (
    <div className="p-4">
   
      <button 
        onClick={() => deleteCard(state.id)} 
        className="absolute top-2 right-2 text-xl text-red-500">
        <Trash2 />
      </button>

    
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div 
            className="bg-white shadow-md p-4 rounded-md cursor-pointer hover:shadow-lg relative"
            onClick={() => setIsDialogOpen(true)}
          >
            <h3 className="text-lg font-semibold">{metricName}</h3>
            <p className="text-2xl text-blue-500">{metricType}{metricValue}</p>
            <p>{notes}</p>
          </div>
        </DialogTrigger>
        
        {/* Edit Modal */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Metric Card</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <label className="font-semibold" htmlFor="metricName">
              Metric Name
            </label>
            <Input
              id="metricName"
              type="text"
              value={metricName}
              onChange={(e) => setMetricName(e.target.value)}
              className="w-full"
            />
            
            <label className="font-semibold" htmlFor="metricValue">
              Metric Value
            </label>
            <Input
              id="metricValue"
              type="number"
              value={metricValue}
              onChange={(e) => setMetricValue(e.target.value)}
              className="w-full"
            />
            
            <label className="font-semibold" htmlFor="metricType">
              Metric Type
            </label>
            <select
              id="metricType"
              value={metricType}
              onChange={(e) => setMetricType(e.target.value)}
              className="w-full"
            >
              <option value="$">$</option>
              <option value="X">X</option>
              <option value="N">N</option>
              <option value="%">%</option>
            </select>

            <label className="font-semibold" htmlFor="notes">
              Notes
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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

export default MetricCard;
