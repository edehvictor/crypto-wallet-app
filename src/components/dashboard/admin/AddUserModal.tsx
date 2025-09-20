import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    walletAddress: "",
    balance: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("New User Data:", formData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#1a1a1a] text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription className="text-slate-300">
            Fill in the details below to add a new user
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border-gray-500 placeholder:text-slate-200"
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border-gray-500 placeholder:text-slate-200"
          />
          <Input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-500 placeholder:text-slate-200"
          />
          <Input
            name="walletAddress"
            placeholder="Wallet Address"
            value={formData.walletAddress}
            onChange={handleChange}
            className="border-gray-500 placeholder:text-slate-200"
          />
          <Input
            name="balance"
            placeholder="Balance"
            value={formData.balance}
            onChange={handleChange}
            className="border-gray-500 placeholder:text-slate-200"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            className="bg-gray-200 text-gray-900"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#70FF00] text-gray-900 hover:bg-green-700"
            onClick={handleSubmit}
          >
            Add User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
