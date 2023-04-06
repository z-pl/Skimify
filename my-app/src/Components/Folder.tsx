import { FunctionComponent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Document } from "./Document";
import { Draggable } from "react-beautiful-dnd";
import { nanoid} from "nanoid";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Folder(props: any) {
  const [openFolder, setOpenFolder] = useState(false);

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: props.id,  transition: { duration: 150, // milliseconds
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)', }
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition

  };


  function toggleFolder() {
    setOpenFolder(prevState => !prevState);
    console.log("open golder");
  }

  return (
      <li className="flex flex-col hover:cursor-pointer" onClick={toggleFolder} ref={setNodeRef} style={style} {...attributes} {...listeners} >
      <div className="folder-item flex gap-2" >
        <div className="flex gap-2">
          <FontAwesomeIcon icon={faCaretRight} className={`fa-xl ${openFolder ? "caretDown" : "caretRight"}`} />
          <FontAwesomeIcon icon={openFolder ? faFolderOpen : faFolder} className={`fa-xl ${openFolder ? "open-folder" : "close-folder"}`}/>
        </div>
        <div className="">{props.title}</div>

      </div>

        <ul className={`flex flex-col gap-2 pl-8 pt-2 ${openFolder ? "open-docs" : "closed-docs"}`}>
            {openFolder && [<Document title="firstoduct" />,
            <Document title="firstoduct" />,
            <Document title="firstoduct" />,
            <Document title="firstoduct" />,
            <Document title="firstoduct" />]}
        </ul>
      </li>
  )
}
