export default function Logo({
  size = 28,
}) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 2L28 7V15C28 22.5 22.8 27.8 16 30C9.2 27.8 4 22.5 4 15V7L16 2Z"
          stroke="#e7a83b"
          strokeWidth="1.6"
        />

        <path
          d="M11 16L14.5 19.5L21 12"
          stroke="#e7a83b"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="font-display text-[17px] font-bold tracking-[-0.03em]">
        WARDEN
      </span>
    </div>
  );
}