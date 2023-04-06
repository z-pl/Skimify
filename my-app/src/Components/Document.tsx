import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

interface DocumentProps {
  title: string;
  content?: string;
}

export function Document(props: DocumentProps) {
  return (
    <div className="document-item flex gap-2">
      <FontAwesomeIcon icon={faFileLines} className="fa-xl"/>
      <div>{props.title}</div>
    </div>
  )
}
