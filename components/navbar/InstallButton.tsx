"use client";
import { BeforeInstallPromptEvent } from "@/types";
import React, { useState, useEffect } from "react";
import { GrInstallOption } from "react-icons/gr";

const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      // Stash the event so it can be triggered later.
      setDeferredPrompt(promptEvent);
      // Update UI to notify the user they can install the PWA
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        // Clear the saved prompt since it can't be used again
        setDeferredPrompt(null);
        setIsVisible(false);
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className="text-default-500 hover:brightness-[0.8] duration-200"
      onClick={handleInstallClick}
    >
      <GrInstallOption size={25} />
    </button>
  );
};

export default InstallButton;
