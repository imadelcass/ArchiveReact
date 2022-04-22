import style from "./style.module.scss";
import ServiceGrid from "./ServiceGrid";
import ArchiveGrid from "./ArchiveGrid";
function Archive() {
  return (
    <div className={style.archiveAndService}>
      <ArchiveGrid />
      <ServiceGrid />
    </div>
  );
}

export default Archive;
