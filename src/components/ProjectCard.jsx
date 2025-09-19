import clsx from "clsx";
import Link from "next/link";
import WebsiteEmbed from "@/components/WebsiteEmbed";
import Mouse from "@/assets/icons/Mouse";

export default function ProjectCard({
  title,
  href,
  description,
  tags,
  embed,
  reverseOnDesktop,
}) {
  return (
    <article
      className={clsx(
        "flex flex-col md:flex-row items-start gap-4",
        reverseOnDesktop && "md:flex-row-reverse"
      )}
    >
      {/* 網站 Embed */}
      <div className="w-full md:w-4/9">
        <WebsiteEmbed {...embed} />
      </div>

      {/* 文字說明 */}
      <div className="w-full md:w-5/9">
        <Link
          href={href}
          target="_blank"
          className="flex flex-row gap-1 items-end text-h4 font-semibold underline hover:text-green-500"
        >
          {title}
          <Mouse />
        </Link>
        <p className="text-body-lg mt-4 mb-2">{description}</p>
        <p className="text-gray-500">
          {tags.map((t, i) => (i ? ` #${t}` : `#${t}`)).join(" ")}
        </p>
      </div>
    </article>
  );
}
