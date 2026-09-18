"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Share2, Check, Loader2 } from "lucide-react";
import { CHARACTER_IMAGES, DEFAULT_CHARACTER_IMAGE } from "@/data/characterImages";

interface Props {
  isOpen: boolean;
  status: "idle" | "matching" | "analyzing" | "done" | "error";
  result: {
    character: { id: string; name: string; animeSlug: string };
    similarity: number;
    analysis: string;
  } | null;
  errorMessage: string | null;
  onClose: () => void;
  onRetry?: () => void;
}

export function CharacterMatchModal({
  isOpen,
  status,
  result,
  errorMessage,
  onClose,
  onRetry,
}: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  async function handleShare() {
    if (!result) return;
    const shareText = `Am fost potrivit cu ${result.character.name} (${(
      result.similarity * 100
    ).toFixed(0)}% similarity) pe AnimaProfile!`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "AnimaProfile — Rezultatul meu",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // utilizatorul a anulat share-ul nativ, nu tratăm ca eroare
      }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const characterImage = result
    ? CHARACTER_IMAGES[result.character.id] ?? DEFAULT_CHARACTER_IMAGE
    : DEFAULT_CHARACTER_IMAGE;

  return (
        <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      style={{ fontFamily: '"Poppins", system-ui, sans-serif' }}
      onClick={onClose}
    >
        <div
        className="relative w-full max-w-4xl h-[85vh] rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Închide"
        >
          <X size={20} />
        </button>

        {(status === "matching" || status === "analyzing") && (
          <div className="flex flex-col items-center justify-center py-24 text-center px-8">
            <Loader2 className="mb-4 animate-spin text-gray-400" size={32} />
            <p className="text-gray-600">
              {status === "matching"
                ? "Calculating match..."
                : "Writing results..."}
            </p>
            <p className="mt-1 text-sm text-gray-400">
              It may take few seconds...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center py-24 text-center px-8">
            <p className="mb-4 text-gray-700">
              {errorMessage ?? "Ceva nu a mers bine."}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="rounded-lg bg-black px-4 py-2 text-white"
              >
                Try again
              </button>
            )}
          </div>
        )}

          {status === "done" && result && (
          <div className="flex flex-col md:flex-row h-full">
            {/* Coloana stângă — imaginea personajului, fixă */}
            <div className="relative w-full md:w-2/5 h-80 md:h-full flex-shrink-0 bg-gray-50 flex items-center justify-center p-4">
              <div className="relative w-full h-full">
                <Image
                  src={characterImage}
                  alt={result.character.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Coloana dreaptă — text, derulează independent */}
            <div className="flex-1 p-8 overflow-y-auto h-full">
              <div className="mb-6">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-400">
                 Your result
                </p>
                <h2 className="mt-1 text-3xl font-bold text-gray-900">
                  {result.character.name}
                </h2>
                <p className="mt-1 text-gray-500">
                  {(result.similarity * 100).toFixed(1)}% similaritate
                </p>
              </div>

              <div className="prose prose-sm mb-6 max-w-none whitespace-pre-wrap text-gray-700">
                {result.analysis}
              </div>

              <div className="flex flex-wrap gap-3 border-t pt-6">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
                >
                  {copied ? <Check size={16} /> : <Share2 size={16} />}
                  {copied ? "Copied!" : "Share"}
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}