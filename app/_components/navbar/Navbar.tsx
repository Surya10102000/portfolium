"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Menu, Pencil } from "lucide-react";
import { useState } from "react";
import EditProfileBox from "../profile/EditProfileColumn";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-16 flex justify-between items-center px-4">
      <div className="font-extrabold text-3xl">Portfoli<span className="text-green-700">u</span>m</div>
      <div className="space-x-2.5">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <Pencil/>
            </Button >
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>



            {/* Profile container for editing */}
            <EditProfileBox />



          </DialogContent>
        </Dialog>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          variant="outline"
        >
          <Menu />
        </Button>
      </div>
      {isOpen && <div className="absolute right-4 top-14 border">OPTIONs</div>}
    </div>
  );
};
export default Navbar;
