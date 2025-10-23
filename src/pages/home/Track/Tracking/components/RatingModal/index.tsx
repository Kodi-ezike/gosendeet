import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Rating from "@/components/Rating";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createRatings } from "@/services/bookings";

interface RatingModalProps {
  open: boolean;
  onOpenRatingModal: (open: boolean) => void;
  bookingId: string;
}

const RatingModal = ({
  open,
  onOpenRatingModal,
  bookingId,
}: RatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showError, setShowError] = useState(false);

  const { mutate: submitRating, isPending } = useMutation({
    mutationFn: createRatings,
    onSuccess: () => {
      toast.success("Thank you for your feedback!");
      onOpenRatingModal(false);
      setRating(0);
      setComment("");
    },
    onError: (error: any) => {
      toast.error(
        error?.message ?? "Failed to submit rating. Please try again."
      );
    },
  });

  const handleSubmit = () => {
    if (rating === 0) {
      setShowError(true);
      return;
    }
    submitRating({
      bookingId: bookingId,
      score: rating,
      comment: comment,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenRatingModal}>
      <DialogContent className="max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-clash font-semibold mb-2">
            Rate Your Experience
          </DialogTitle>
          <DialogDescription>
            Please rate your delivery experience and provide any feedback
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex flex-col items-center gap-4">
            <Rating
              value={rating}
              onChange={(val) => {
                setRating(val);
                setShowError(false);
              }}
              size={32}
              className=""
            />
            {showError && (
              <p className="text-red-500 text-sm">Please select a rating</p>
            )}
            <Textarea
              placeholder="Share your experience (optional)"
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setComment(e.target.value)
              }
              className="min-h-[80px] resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenRatingModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={isPending}>
            Submit Rating
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RatingModal;
