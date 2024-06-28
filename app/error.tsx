"use client";

import { Button } from "@nextui-org/button";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className="mt-[30vh] font-bold text-lg">Something went wrong!</h2>
      <Button
        className="rounded-none mt-5 text-lime-100"
        color="warning"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
