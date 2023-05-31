import Link from "next/link";

type EditButtonProps = {
  children?: React.ReactNode;
  caseId?: string;
};

const EditButton = ({ children, caseId }: EditButtonProps) => {
  return (
    <Link
      className={["edit-button", caseId ? "edit-button--solid" : "edit-button--outline"].join(" ")}
      href={caseId ? `/case/edit/${caseId}` : "/case/create"}
    >
      {children}
    </Link>
  );
};

export default EditButton;
