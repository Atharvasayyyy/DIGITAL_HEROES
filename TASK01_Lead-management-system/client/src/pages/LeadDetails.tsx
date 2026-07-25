import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import NoteForm from "../components/notes/NoteForm";
import NoteList from "../components/notes/NoteList";
import ActivityList from "../components/activity/ActivityList";

import {
  getLeadById,
  updateLeadStatus,
  deleteLead,
} from "../api/leadApi";

import { useAuthStore } from "../store/authStore";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const [tab, setTab] = useState<"notes" | "activity">("notes");

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["lead", id],
    queryFn: () => getLeadById(id!),
    enabled: !!id,
  });

  const statusMutation = useMutation({
    mutationFn: (status: string) =>
      updateLeadStatus(id!, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lead", id],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteLead(id!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });

      navigate("/leads");
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        Loading lead...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        {(error as Error).message}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        Lead not found.
      </div>
    );
  }

  const canEdit = user?.role === "admin";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">
            {data.name}
          </h1>

          <div className="mt-3 space-y-1 text-gray-600">
            <p>
              Email:{" "}
              <a
                href={`mailto:${data.email}`}
                className="text-blue-600"
              >
                {data.email}
              </a>
            </p>

            <p>
              Phone:{" "}
              <a
                href={`tel:${data.phone}`}
                className="text-blue-600"
              >
                {data.phone}
              </a>
            </p>

            {data.company && (
              <p>Company: {data.company}</p>
            )}

            <p>
              Status:
              <span className="ml-2 font-semibold text-blue-600">
                {data.status}
              </span>
            </p>

            <p>
              Assigned To:
              <span className="ml-2">
                {data.assignedTo?.name || "Unassigned"}
              </span>
            </p>
          </div>
        </div>

        {user?.role === "admin" && (
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this lead?"
                )
              ) {
                deleteMutation.mutate();
              }
            }}
            disabled={deleteMutation.isPending}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            Delete Lead
          </button>
        )}
      </div>

      {/* Message */}
      {data.message && (
        <div className="rounded-lg border bg-gray-50 p-4">
          <h3 className="mb-2 font-semibold">
            Message
          </h3>

          <p>{data.message}</p>
        </div>
      )}

      {/* Status */}
      {user?.role === "admin" && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <label className="mb-2 block font-medium">
            Change Status
          </label>

          <select
            value={data.status}
            disabled={statusMutation.isPending}
            onChange={(e) =>
              statusMutation.mutate(e.target.value)
            }
            className="rounded-lg border p-2"
          >
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="PROPOSAL_SENT">
              Proposal Sent
            </option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
          </select>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-6">
          <button
            onClick={() => setTab("notes")}
            className={`border-b-2 px-4 py-2 ${
              tab === "notes"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            Notes
          </button>

          <button
            onClick={() => setTab("activity")}
            className={`border-b-2 px-4 py-2 ${
              tab === "activity"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            Activity
          </button>
        </div>
      </div>

      {/* Content */}
      {tab === "notes" && (
        <div className="space-y-4">
          <NoteForm
            leadId={id!}
            onSuccess={() =>
              queryClient.invalidateQueries({
                queryKey: ["lead", id],
              })
            }
          />

          <NoteList leadId={id!} />
        </div>
      )}

      {tab === "activity" && (
        <ActivityList leadId={id!} />
      )}
    </div>
  );
}