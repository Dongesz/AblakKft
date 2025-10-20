import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import type { Id, Task } from "../types"
import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable";


interface Props{
    task: Task;
    deleteTask: (id: Id) => void;
  onOpenDetails?: (id: Id) => void;
}
  

function TaskCard({ task, deleteTask, onOpenDetails }: Props) {
  const [mouseIsOver, setMouseIsOver]= useState(false)

    const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  })

    const style: React.CSSProperties = {
      transition,                               
      transform: CSS.Transform.toString(transform), 
    };

  const openDetails = () => {
    setMouseIsOver(false)
    if (typeof task.id === 'number' && onOpenDetails) onOpenDetails(task.id)
  }
    if (isDragging)
    {
        return <div ref={setNodeRef}
        style={style} className=" bg-mainBackgroundColor p-2.5 
    h-[100px] min-h-[100px] items-center 
    flex text-left rounded-xl border-2 border-rose-500 
    cursor-grab relative opacity-50"/>
    }
    
    
  // Helper to format date nicely
  const formatDate = (iso?: string) => {
    if (!iso) return '';
    try { return new Date(iso).toLocaleString(); } catch { return iso; }
  }

  return (
  <div
  ref={setNodeRef}
  style={style}
  {...attributes}
  {...listeners}
  onClick={openDetails} 
  className="bg-mainBackgroundColor p-2.5 
  h-[100px] min-h-[100px] items-center 
  flex text-left rounded-xl hover:ring-2 
  hover:ring-inset hover:ring-rose-500 
  cursor-grab relative"
  onMouseEnter={() => {
    setMouseIsOver(true)
  }}
  onMouseLeave={() => {
    setMouseIsOver(false)
  }}>
      <div className="flex flex-col w-full">
        <div className="font-semibold">{task.content}</div>
        <div className="text-xs opacity-70 mt-1">{task.region ?? 'Unknown'} • {formatDate(task.createdAt)}</div>
      </div>

    { mouseIsOver && <button onClick={() => {
      deleteTask(task.id);
    }} className="stroke-white absolute right-4 top-1/2-translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"><TrashIcon/></button>}
    </div>
  )
}

export default TaskCard