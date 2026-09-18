import { PaymentLogo } from "@/components/ui/PaymentLogo";

const QR_SIZE = 21;
const FINDER_POSITIONS = [
  [0, 0],
  [14, 0],
  [0, 14],
] as const;

function isFinderZone(x: number, y: number) {
  return FINDER_POSITIONS.some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
}

function isCenterZone(x: number, y: number) {
  return x >= 7 && x < 14 && y >= 7 && y < 14;
}

const DATA_MODULES = Array.from({ length: QR_SIZE * QR_SIZE }, (_, i) => {
  const x = i % QR_SIZE;
  const y = Math.floor(i / QR_SIZE);
  if (isFinderZone(x, y) || isCenterZone(x, y)) return null;
  const active = (x * 3 + y * 7 + x * y) % 5 === 0 || (x + y) % 6 === 0;
  return active ? { x, y } : null;
}).filter((module): module is { x: number; y: number } => module !== null);

function FinderPattern({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={7} height={7} fill="#111827" />
      <rect x={x + 1} y={y + 1} width={5} height={5} fill="#fff" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="#111827" />
    </g>
  );
}

export function QrPreviewGraphic() {
  return (
    <div className="relative flex h-40 w-40 items-center justify-center rounded-xl bg-white p-3 shadow-sm sm:h-44 sm:w-44">
      <svg viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} className="h-full w-full" aria-hidden="true">
        {DATA_MODULES.map(({ x, y }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#111827" />
        ))}
        {FINDER_POSITIONS.map(([x, y]) => (
          <FinderPattern key={`${x}-${y}`} x={x} y={y} />
        ))}
      </svg>
      <div className="absolute flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-sm sm:h-11 sm:w-11">
        <PaymentLogo brand="bangla-qr-mark" size="md" />
      </div>
    </div>
  );
}
