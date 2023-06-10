"use client";
import { useRouter } from "next/navigation";

type EditButtonProps = {
  children?: React.ReactNode;
  caseId?: string;
};

const EditButton = ({ children, caseId }: EditButtonProps) => {
  const router = useRouter();
  const buttonClasses = [
    'edit-button',
    caseId ? 'edit-button--solid' : 'edit-button--outline',
  ].join(' ');

  const buttonLink = caseId ? `/case/edit/${caseId}` : '/case/create';

  const handleClick = () => {
    router.push(buttonLink);
  };

  return (
    <button className={buttonClasses} onClick={handleClick}>
      {children}
    </button>
  );
};

export default EditButton;
