"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SaveIcon,
  LoaderCircleIcon,
  SendIcon,
  AlertTriangleIcon,
  // shield-checkIcon,
  ShieldCheckIcon,
} from "lucide-react";
import type { RideStatus } from "@prisma/client";

const STATUS_OPTIONS: { value: RideStatus; label: string }[] = [
  { value: "NEW_REQUEST", label: "New Request" },
  { value: "UNDER_REVIEW", label: "Under Review" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "DECLINED", label: "Declined" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "NO_SHOW", label: "No Show" },
];

const STATUS_COLORS: Record<RideStatus, string> = {
  NEW_REQUEST: "bg-blue-100 text-blue-800",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-green-100 text-green-800",
  DECLINED: "bg-red-100 text-red-800",
  IN_PROGRESS: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-orange-100 text-orange-800",
  NO_SHOW: "bg-rose-100 text-rose-800",
};

type RideAdminActionsProps = {
  rideId: string;
  currentStatus: RideStatus;
  dispatchNotes: string | null;
  declineReason: string | null;
  finalPrice: string | null;
};

export default function RideAdminActions({
  rideId,
  currentStatus,
  dispatchNotes: initialDispatchNotes,
  declineReason: initialDeclineReason,
  finalPrice: initialFinalPrice,
}: RideAdminActionsProps) {
  const router = useRouter();
  const [status, setStatus] = useState<RideStatus>(currentStatus);
  const [dispatchNotes, setDispatchNotes] = useState(
    initialDispatchNotes || "",
  );
  const [declineReason, setDeclineReason] = useState(
    initialDeclineReason || "",
  );
  const [finalPrice, setFinalPrice] = useState(initialFinalPrice || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Note form state
  const [noteContent, setNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [noteError, setNoteError] = useState<string | null>(null);

  const statusChanged = status !== currentStatus;
  const showDeclineReason = status === "DECLINED";

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const body: Record<string, unknown> = {
        status,
        dispatchNotes: dispatchNotes || null,
        finalPrice: finalPrice ? parseFloat(finalPrice) : null,
      };

      if (showDeclineReason) {
        body.declineReason = declineReason || null;
      }

      const res = await fetch(`/api/admin/rides/${rideId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update ride");
      }

      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  async function handleAddNote() {
    if (!noteContent.trim()) return;

    setAddingNote(true);
    setNoteError(null);

    try {
      const res = await fetch(`/api/admin/rides/${rideId}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: noteContent.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add note");
      }

      setNoteContent("");
      router.refresh();
    } catch (err) {
      setNoteError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setAddingNote(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Status & Actions Card */}
      <Card className="border-2 border-primary! shadow-md shadow-primary/10!">
        <CardHeader className=" border-b border-primary/10">
          <CardTitle className="text-primary font-bold flex gap-2 items-center">
            {" "}
            <ShieldCheckIcon size={20} /> Admin Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status Display */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Current Status:
            </span>
            <Badge variant="secondary" className={STATUS_COLORS[currentStatus]}>
              {STATUS_OPTIONS.find((s) => s.value === currentStatus)?.label}
            </Badge>
          </div>

          <Separator />

          {/* Status Change */}
          <div className="space-y-2">
            <Label htmlFor="status-select">Change Status</Label>
            <select
              id="status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as RideStatus)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {statusChanged && (
              <p className="text-xs text-amber-600">
                Status will change from{" "}
                <strong>
                  {STATUS_OPTIONS.find((s) => s.value === currentStatus)?.label}
                </strong>{" "}
                to{" "}
                <strong>
                  {STATUS_OPTIONS.find((s) => s.value === status)?.label}
                </strong>
              </p>
            )}
          </div>

          {/* Decline Reason (conditional) */}
          {showDeclineReason && (
            <div className="space-y-2">
              <Label htmlFor="decline-reason">
                Decline Reason
                <span className="text-destructive"> *</span>
              </Label>
              <Textarea
                id="decline-reason"
                placeholder="Explain why this ride request was declined..."
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                rows={3}
              />
            </div>
          )}

          {/* Dispatch Notes */}
          <div className="space-y-2">
            <Label htmlFor="dispatch-notes">Dispatch Notes</Label>
            <Textarea
              id="dispatch-notes"
              placeholder="Internal notes about this ride..."
              value={dispatchNotes}
              onChange={(e) => setDispatchNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Final Price */}
          <div className="space-y-2">
            <Label htmlFor="final-price">Final Price ($)</Label>
            <input
              id="final-price"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={finalPrice}
              onChange={(e) => setFinalPrice(e.target.value)}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
          </div>

          {/* Error / Success Messages */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertTriangleIcon className="size-4 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              Ride updated successfully.
            </div>
          )}

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-11 text-base"
          >
            {saving ? (
              <LoaderCircleIcon className="size-4 animate-spin" />
            ) : (
              <SaveIcon className="size-4" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Add Note Card */}
      <Card>
        <CardHeader>
          <CardTitle>Add Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Add an internal note about this ride..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            rows={3}
          />
          {noteError && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertTriangleIcon className="size-4 shrink-0" />
              {noteError}
            </div>
          )}
          <Button
            onClick={handleAddNote}
            disabled={addingNote || !noteContent.trim()}
            variant="outline"
            className="w-full"
          >
            {addingNote ? (
              <LoaderCircleIcon className="size-4 animate-spin" />
            ) : (
              <SendIcon className="size-4" />
            )}
            {addingNote ? "Adding..." : "Add Note"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
