import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Folder } from "./Folder"
import { useState } from "react"

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { nanoid } from "nanoid"
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";


export function FolderSidebar() {
  const foldersData = [
    {
      id:"0",
      title: "folder1"
    },
    {
      id:"1",
      title: "folder2"
    },
    {
      id:"2",
      title: "folder3"
    }
  ]
  const [folders, setFolders] = useState(foldersData);
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance:5 }
    }),
  )
  function handleDragEnd(event: DragEndEvent) {
    const {active, over}: {active: any, over: any} = event;
    if (active.id !== over.id) {
      setFolders((prevFolders) => {
        const activeIndex = prevFolders.findIndex((folder) => folder.id === active.id);
        const overIndex = prevFolders.findIndex((folder) => folder.id === over.id);

        return arrayMove(prevFolders, activeIndex, overIndex);
      })
    }
  }


  return (
    <div className="w-4/12 border border-rose-500 m-4 p-4 flex flex-col text-left">
        <div className="font-bold w-full text-left"> Your Folders </div>
        <div className="border border-black w-full"> </div>
        <button className="add-folder-btn bg-slate-300 border rounded-md my-2 py-1 font-bold hover:bg-slate-400">
          <FontAwesomeIcon icon={faPlus}  className="fa-lg add-icon"/>
          <span className="px-1">Add Folder</span>
          </button>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}>
          <ul className="folders flex flex-col gap-2">

            <SortableContext
              items={folders}
              strategy={verticalListSortingStrategy}>

                {folders && folders.map((folder, index) => {
                  return (
                    <Folder key={folder.id} id={folder.id} title = {folder.title} />)
                })
                }
            </SortableContext>
          </ul>
          </DndContext>
    </div>
  )
}


// Backend
// Two Tables
// User table one To many
// Records | Summary : String
// Front End Input ->

// ok@gmail.com -> API call to the backend

//
