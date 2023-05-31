import TextWithMarkdown from "./TextWithMarkdown";

type CasePreviewProps = {
  body: string;
};

const CasePreview = ({ body }: CasePreviewProps) => {
  return (
    <div className="note-preview">
      <TextWithMarkdown text={body} />
    </div>
  );
};

export default CasePreview;
