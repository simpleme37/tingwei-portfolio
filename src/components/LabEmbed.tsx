import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
  src: string;
  title: string;
  ratio?: string;
  className?: string;
  caption?: string;
};

export default function LabEmbed({
  src,
  title,
  ratio = "16/9",
  className,
  caption,
}: Props) {
  return (
    <figure className={clsx("overflow-hidden", className)}>
      <div className="relative w-full border" style={{ aspectRatio: ratio }}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          allow="fullscreen; clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          referrerPolicy="no-referrer"
        />
      </div>
      {title && (
        <div className="font-sans text-h4 mt-2">
          {title}
          <Link href={""}>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className="inline-block"
            />
          </Link>
        </div>
      )}
      {caption && <div className="font-sans text-body">{caption}</div>}
    </figure>
  );
}
