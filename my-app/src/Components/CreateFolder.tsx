import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

export function CreateFolder() {
  return (
    <li className="flex flex-col hover:cursor-pointer">
      <div className="folder-item flex gap-2" >
        <div className="flex gap-2">
          <FontAwesomeIcon icon={faCaretRight} className={`fa-xl "caretRight"}`} />
          <FontAwesomeIcon icon={faFolder} className={`fa-xl`}/>
        </div>
        <div className=""></div>

      </div>
    </li>

  )
}
