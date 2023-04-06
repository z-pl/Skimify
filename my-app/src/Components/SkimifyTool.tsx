import { FolderSidebar } from "./FolderSidebar";

export default function SkimifyTool() {
  return (
        <div className="wrapper w-9/12 h-full">

          <div className="bOut border top"></div>
          <div className="bOut border left"></div>
          <div className="bOut border right"></div>
          <div className="bOut border bottom-left"></div>
          <div className="bOut border bottom-right"></div>

          <FolderSidebar />
      </div>
  );

}
