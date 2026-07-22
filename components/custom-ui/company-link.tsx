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
      className="underline decoration-purple-300 underline-offset-4 transition-colors hover:text-white"
    >
      {company}
    </Link>
  );
};

export default CompanyLink;
