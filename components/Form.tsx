"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.SyntheticEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsUploading(true);
    setError("");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;

        const next = prev + Math.random() * 12;

        return next > 90 ? 90 : next;
      });
    }, 300);

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        if (data.processedImageUrl) {
          router.push(
            `/result?image=${encodeURIComponent(data.processedImageUrl)}`
          );
        } else {
          setError("No processed image returned");
        }
      }, 400);
    } catch (err) {
      clearInterval(interval);
      setProgress(0);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Upload failed");
      }
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
      >
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Upload Image
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose an image and apply an operation.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-slate-700"
          >
            Image
          </label>

          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            required
            className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white text-sm text-slate-500 shadow-sm file:mr-4 file:cursor-pointer file:rounded-l-xl file:border-0 file:bg-slate-100 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="operation"
            className="block text-sm font-medium text-slate-700"
          >
            Operation
          </label>

          <select
            id="operation"
            name="operation"
            className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="grayscale">Grayscale</option>
            <option value="resize">Resize</option>
            <option value="compress">Compress</option>
          </select>
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Processing...</span>
              <span className="font-medium text-indigo-600">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isUploading}
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}