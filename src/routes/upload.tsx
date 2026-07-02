import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Upload, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Add your statements · Spotlite" },
      { name: "description", content: "Drop in your statements or try the sample customer." },
    ],
  }),
  component: UploadPage,
});

interface DetectedDoc {
  id: number;
  bank: string;
  product: string;
  period: string;
  ready: boolean;
}

const initialDocs: DetectedDoc[] = [
  { id: 1, bank: "SBI", product: "Savings", period: "Apr–Mar", ready: true },
  { id: 2, bank: "HDFC", product: "Savings", period: "Apr–Mar", ready: true },
  { id: 3, bank: "SBI", product: "Credit Card", period: "Apr–Mar", ready: true },
  { id: 4, bank: "ICICI", product: "Savings", period: "Apr–Mar", ready: false },
];

const extraBanks = [
  { bank: "Axis", product: "Salary" },
  { bank: "Kotak", product: "Savings" },
  { bank: "ICICI", product: "Credit Card" },
];

function UploadPage() {
  const nav = useNavigate();
  const [docs, setDocs] = useState<DetectedDoc[]>(initialDocs);
  const [dragging, setDragging] = useState(false);
  const idRef = useRef(100);
  const addedRef = useRef(0);

  // The ICICI "reading" row resolves shortly after landing on the page.
  useEffect(() => {
    const t = setTimeout(
      () => setDocs((d) => d.map((x) => (x.ready ? x : { ...x, ready: true }))),
      1600,
    );
    return () => clearTimeout(t);
  }, []);

  function addStatement() {
    const next = extraBanks[addedRef.current % extraBanks.length];
    addedRef.current += 1;
    const id = idRef.current++;
    setDocs((d) => [...d, { id, ...next, period: "Apr–Mar", ready: false }]);
    toast.success(`${next.bank} ${next.product} added`, {
      description: "Extraction Agent is reading the statement…",
    });
    setTimeout(() => setDocs((d) => d.map((x) => (x.id === id ? { ...x, ready: true } : x))), 1400);
  }

  const readyCount = docs.filter((d) => d.ready).length;

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-6 py-8">
      <Link to="/consent" className="flex items-center gap-2 text-sm text-text-secondary">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>
      <h1 className="mt-6 font-display text-3xl font-bold">Add your statements</h1>
      <p className="mt-2 text-text-secondary">
        Multi-bank, multi-document. The Extraction Agent auto-detects bank, account type and period.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addStatement();
          }}
          className={`card-spot flex flex-col items-center justify-center gap-3 border-dashed p-12 text-center transition ${
            dragging ? "border-brand bg-brand-secondary/5 ring-2 ring-brand-secondary/30" : ""
          }`}
        >
          <Upload className="h-10 w-10 text-brand" />
          <p className="font-medium">Drag &amp; drop, or tap to upload</p>
          <p className="text-xs text-text-secondary">PDF · CSV · Excel</p>
          <button
            onClick={addStatement}
            className="mt-2 rounded-pill border border-border px-4 py-2 text-sm font-medium transition hover:bg-surface-alt"
          >
            Browse files
          </button>
          <p className="mt-4 text-xs text-text-secondary">
            Tip: add every bank you use for the full picture.
          </p>
        </div>

        <div className="card-spot p-5">
          <p className="text-sm font-semibold">Detected ({readyCount})</p>
          <ul className="mt-3 space-y-2 text-sm">
            <AnimatePresence initial={false}>
              {docs.map((d) => (
                <motion.li
                  key={d.id}
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  className="flex items-center justify-between rounded-lg bg-surface-alt px-3 py-2"
                >
                  <span className="flex items-center gap-2">
                    {d.ready ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin text-text-secondary" />
                    )}
                    <span className="font-medium">{d.bank}</span>
                    <span className="text-text-secondary">{d.product}</span>
                  </span>
                  <span className="font-num text-xs text-text-secondary">
                    {d.ready ? d.period : "reading…"}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="mt-4 flex flex-wrap items-center gap-1 text-xs text-text-secondary">
            Banks:{" "}
            {Array.from(new Set(docs.map((d) => d.bank))).map((b, i, arr) => (
              <span key={b} className="font-medium">
                {b}
                {i < arr.length - 1 ? " · " : ""}
              </span>
            ))}
            <span className="ml-2">Period: 12 months</span>
          </div>

          <button
            onClick={() => nav({ to: "/processing" })}
            className="mt-5 w-full rounded-pill bg-brand-gradient py-3 text-sm font-semibold text-on-brand shadow-brand"
          >
            Build my dashboard
          </button>
        </div>
      </div>

      <button
        onClick={() => nav({ to: "/processing" })}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
      >
        <Sparkles className="h-4 w-4" /> Or use the sample customer (Rohan) for an instant demo
      </button>
    </div>
  );
}
