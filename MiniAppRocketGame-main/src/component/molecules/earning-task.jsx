import AtomLabel from "../atom/atom-label";
import TaskList from "../atom/task-list";

const EarningTask = () => {
    return (
        <div className="flex flex-col gap-2">
            <AtomLabel content={"Tasks"} />
            <TaskList />
        </div>
    )
}

export default EarningTask;