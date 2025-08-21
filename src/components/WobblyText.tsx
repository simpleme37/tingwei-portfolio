// components/WobblyText.tsx
import clsx from "clsx";

export default function WobblyText({
  text,
  active = true, // 用來控制是否播放
  duration = 3.6, // 每圈秒數
  delayStep = 0.08, // 每個字錯開多少秒
  className,
}: {
  text: string;
  active?: boolean;
  duration?: number;
  delayStep?: number;
  className?: string;
}) {
  const chars = Array.from(text);
  return (
    <h2 className={clsx("inline-block whitespace-pre", className)}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className={clsx(active && "wobble-letter")}
          style={{
            animationDuration: `${duration}s`,
            animationDelay: `${i * delayStep}s`,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </h2>
  );
}
