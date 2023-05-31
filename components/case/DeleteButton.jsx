"use client";
import { TransitionStartFunction, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { parse } from "path";

// type DeleteButtonProps = { id: string };

const deleteNote = async (
  id,
  router,
  startTransition,
) => {
  const res = await fetch(`/api/case/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      id: parseInt (id)
    }),
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
    },
  });
  
  if (res.ok) {
    startTransition(() => {
      router.replace("/");
      router.refresh();
    });
  }
};

const DeleteButton = ({ id }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      className="delete-button delete-button--solid"
      onClick={() => deleteNote(id, router, startTransition)}
      disabled={isPending}
    >
      {isPending ? "Deleting case..." : "Delete Case"}
    </button>
  );
};

export default DeleteButton;
