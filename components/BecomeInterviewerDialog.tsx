"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { api } from "../../convex/_generated/api";

interface BecomeInterviewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function BecomeInterviewerDialog({ isOpen, onClose }: BecomeInterviewerDialogProps) {
  const { user } = useUser();
  const updateRole = useMutation(api.users.updateRole);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await updateRole({ email, role: "interviewer" });
      toast.success("You're now an interviewer!");
      setEmail("");
      onClose();
      // reload so the whole app picks up the new role immediately
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update role");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Become an Interviewer</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">
            Confirm the email on your account ({user?.primaryEmailAddress?.emailAddress}) to
            switch your role to interviewer.
          </p>

          <div className="space-y-2">
            <Label htmlFor="confirm-email">Your account email</Label>
            <Input
              id="confirm-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={!email.trim() || isSubmitting}>
              {isSubmitting ? "Updating..." : "Become Interviewer"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BecomeInterviewerDialog;
