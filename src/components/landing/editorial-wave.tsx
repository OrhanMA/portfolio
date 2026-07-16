import { cn } from "@/lib/utils";

export function EditorialWave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 260"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn(
        "pointer-events-none block h-32 w-full overflow-visible text-primary sm:h-40 lg:h-52",
        className,
      )}
    >
      <g className="wave-fill">
        <path
          d="M0 166c94-20 138-84 230-72 104 14 117 103 233 101 117-3 151-95 259-102 105-7 142 87 248 84 108-2 147-105 269-104 107 1 144 86 361 65v122H0Z"
          fill="color-mix(in oklch, var(--primary) 13%, transparent)"
        />
        <path
          d="M0 194c93-27 153-77 238-58 77 18 104 83 212 80 114-4 154-76 266-83 100-6 146 69 244 69 109 0 168-88 273-89 116-1 170 75 367 50v97H0Z"
          fill="color-mix(in oklch, var(--background) 88%, var(--primary))"
        />
      </g>

      <g
        className="wave-strokes"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      >
        <path
          className="wave-path"
          pathLength="1"
          d="M0 166c94-20 138-84 230-72 104 14 117 103 233 101 117-3 151-95 259-102 105-7 142 87 248 84 108-2 147-105 269-104 107 1 144 86 361 65"
          strokeWidth="4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="wave-path"
          pathLength="1"
          d="M0 194c93-27 153-77 238-58 77 18 104 83 212 80 114-4 154-76 266-83 100-6 146 69 244 69 109 0 168-88 273-89 116-1 170 75 367 50"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          opacity=".76"
        />
        <path
          className="wave-path"
          pathLength="1"
          d="M45 183c71-20 112-61 176-55 74 7 109 73 194 67m143-17c54-41 98-63 157-58 68 6 104 55 170 62m180-25c61-42 103-63 171-58 62 5 107 46 176 54"
          strokeDasharray="1 10"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          opacity=".5"
        />
      </g>

      <g className="wave-foam" fill="var(--background)" stroke="currentColor" strokeWidth="2">
        {[
          [173, 98, 9],
          [197, 91, 6],
          [220, 98, 8],
          [682, 91, 8],
          [707, 84, 5],
          [733, 91, 8],
          [1194, 72, 9],
          [1221, 65, 6],
          [1248, 74, 9],
          [1270, 88, 5],
        ].map(([cx, cy, radius]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={radius}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      <g className="wave-speckles" fill="currentColor" opacity=".42">
        {[
          [80, 117],
          [118, 95],
          [265, 116],
          [315, 147],
          [588, 116],
          [770, 125],
          [1010, 132],
          [1090, 94],
          [1320, 104],
          [1450, 123],
          [1510, 94],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
        ))}
      </g>
    </svg>
  );
}

export function UkiyoeCrest({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 360 280"
      aria-hidden="true"
      className={cn(
        "pointer-events-none overflow-visible text-primary",
        flip && "-scale-x-100",
        className,
      )}
    >
      <g className="crest-fill">
        <path
          d="M2 274c38-70 70-125 134-141 53-13 109 8 131 53 13 26 11 58 2 86-11-38-39-68-73-69 23 11 39 33 40 59-48-35-94-47-138-25-29 15-54 31-96 37Z"
          fill="currentColor"
          opacity=".92"
        />
        <path
          d="M42 259c40-52 73-82 120-86 35-3 66 12 81 39-27-18-57-21-81-8 19 3 35 14 45 31-39-17-76-12-111 9-19 11-36 18-54 15Z"
          fill="var(--background)"
        />
        <path
          d="M0 276c68-13 118-33 174-18 50 13 83 9 123-18 20-13 38-15 63-12v52H0Z"
          fill="color-mix(in oklch, var(--primary) 16%, var(--background))"
        />
      </g>

      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <path
          className="wave-path"
          pathLength="1"
          d="M2 274c38-70 70-125 134-141 53-13 109 8 131 53 13 26 11 58 2 86-11-38-39-68-73-69 23 11 39 33 40 59-48-35-94-47-138-25-29 15-54 31-96 37"
          strokeWidth="4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="wave-path"
          pathLength="1"
          d="M40 258c40-51 75-79 122-82 38-2 69 15 82 43m-183 40c38-30 74-43 115-36 27 5 47 15 66 33"
          strokeWidth="2.2"
          vectorEffect="non-scaling-stroke"
          opacity=".78"
        />
        <path
          d="M19 269c46-19 88-32 132-23 43 10 77 24 118 7 28-12 50-27 85-24"
          strokeDasharray="2 8"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          opacity=".55"
        />
      </g>

      <g className="crest-foam" fill="var(--background)" stroke="currentColor" strokeWidth="2">
        {[
          [128, 135, 11],
          [151, 128, 8],
          [176, 132, 10],
          [203, 143, 8],
          [225, 157, 11],
          [247, 177, 8],
        ].map(([cx, cy, radius]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={radius} />
        ))}
      </g>
    </svg>
  );
}
