import { Link } from "@tanstack/react-router";
import type { CoachAnswer } from "@/shared/data/rohan";

export function CoachAnswerCard({ answer }: { answer: CoachAnswer }) {
  return (
    <div className="card-spot max-w-sm space-y-2 p-4">
      <p className="text-xs font-medium text-text-secondary">{answer.title}</p>
      {answer.primary && (
        <p className="font-display text-3xl font-bold font-num text-text-primary">
          {answer.primary}
        </p>
      )}
      {answer.bars && <Sparkline values={answer.bars} />}
      {answer.bullets && (
        <ul className="space-y-1 pt-1 text-sm">
          {answer.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-brand">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {answer.caption && <p className="text-sm text-text-secondary">{answer.caption}</p>}
      {answer.link && (
        <Link
          to={answer.link.to as never}
          params={answer.link.params as never}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
        >
          {answer.link.label} ▸
        </Link>
      )}
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-12 items-end gap-1">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm bg-brand"
          style={{ height: `${(v / max) * 100}%`, minHeight: 4 }}
        />
      ))}
    </div>
  );
}
