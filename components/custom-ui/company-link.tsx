import Link from "next/link";

interface CompanyLinkProps {
  company: string;
  companyUrl?: string;
}

const CompanyLink = ({ company, companyUrl }: CompanyLinkProps) => {
  if (!companyUrl) return <>{company}</>;

  return (
    <Link
      href={companyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
    >
      {company}
    </Link>
  );
};

export default CompanyLink;
