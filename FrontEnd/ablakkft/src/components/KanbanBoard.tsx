import { useMemo, useState, useEffect } from "react"
import PlusIcon from "../icons/PlusIcon"
import type { Column, Id, Task } from "../types"
import ColumnContainer from "./ColumnContainer"
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"
import TaskCard from "./TaskCard"
import { getAllOrders, orderToTask } from "../services/orders"


function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>(() => {
        const makeId = () => Math.floor(Math.random() * 1000000)
        return [
            { id: makeId(), title: "Beerkezo" },
            { id: makeId(), title: "feldolgozas alatt" },
            { id: makeId(), title: "szallitasra kesz" },
            { id: makeId(), title: "kiszallitva" },
        ]
    })
    const columnsId = useMemo(() => columns.map(col => col.id), [columns])
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<string>("all")
    const regions = ["all", "Budapest", "Pest", "Fejér", "Győr-Moson-Sopron"]
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            }
        })
    )
    useEffect(() => {
        (async () => {
            try {
                const orders = await getAllOrders();
                const mapped = orders.map(orderToTask);
                setTasks(mapped as Task[]);
            } catch (err) {
                console.error("Failed to load orders:", err);
            }
        })()
    }, [])
  return (
    <div className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
    ">
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
        <div className="mb-4 flex items-center gap-4">
            <label className="text-sm">Szűrés megye szerint:</label>
            <select className="bg-mainBackgroundColor px-2 py-1 rounded" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                {regions.map(r => (
                    <option key={r} value={r}>{r}</option>
                ))}
            </select>
        </div>
        <div className="m-auto flex gap-4">
            <div className="flex gap-4">
                <SortableContext items={columnsId}>
                {columns.map((col) => (
                    <ColumnContainer 
                        key={col.id}
                        column={col}
                        deleteColumn={deleteColumn}
                        updateColumn={updateColumn}
                        createTask={createTask}
                        tasks = {tasks.filter(task => ((String(task.columnId) === String(col.id) || task.columnId === col.title) && (selectedRegion === 'all' || task.region === selectedRegion)))}
                        deleteTask={deleteTask}
                        />
                    ))}
            </SortableContext>
            </div>
           
        <button 
        onClick={()=>{
            createNewColumn()
        }}
        className="
        h-[60px]
        w-[350px]
        min-w-[350px]
        cursor-pointer
        rounded-lg
        bg-mainBackgroundColor
        border-2
        border-columnBackgroundColor
        p-4
        ring-rose-500
        hover:ring-2
        flex
        gap-2
        "> 
            <PlusIcon/>
            Add Column
        </button>
        </div>
        {createPortal(
            <DragOverlay>
                {activeColumn && (
                <ColumnContainer
                    column={activeColumn}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    tasks = {tasks.filter(task => (String(task.columnId) === String(activeColumn.id) || task.columnId === activeColumn.title))}
                    deleteTask={deleteTask}
                />
                ) 
                }
                {
                    activeTask && <TaskCard task={activeTask} deleteTask={deleteTask}/>
                }
            </DragOverlay>,
            document.body
        )}
        
        </DndContext>
    </div>
    
  )

  function createTask(columnId: Id)
  {
    const newTask: Task = {
        id: genereteId(),
        columnId,
                content: `Task ${tasks.length + 1}`,
                region: selectedRegion === 'all' ? 'Budapest' : selectedRegion,
                createdAt: new Date().toISOString(),
    }

    setTasks([...tasks, newTask])
  }

  function deleteTask(id:Id){
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks);
  }

  function createNewColumn(){
    const columnToAdd:Column = {
        id: genereteId(),
        title: `Column ${columns.length + 1}`
    }

    setColumns([...columns, columnToAdd])
  }

  function deleteColumn(id: Id){
        const filterColumns = columns.filter(col => col.id !== id)
        setColumns(filterColumns)
        const columnTitle = columns.find(c => c.id === id)?.title
        const newTasks = tasks.filter((t) => !(String(t.columnId) === String(id) || (columnTitle !== undefined && t.columnId === columnTitle)))
        setTasks(newTasks)
  }

  function updateColumn(id: Id, title: string)
  {
    const newColumns = columns.map((col) => {
        if (col.id !== id) return col;
        return {...col, title};
    })
    setColumns(newColumns);
  }


  function onDragStart(event: DragStartEvent){
    if(event.active.data.current?.type === "Column")
    {
        setActiveColumn(event.active.data.current.column)
        return;
    }
     if(event.active.data.current?.type === "Task")
    {
        setActiveTask(event.active.data.current.task)
        return;
    }
  }

  function onDragEnd(event: DragEndEvent){
    setActiveColumn(null)
    setActiveTask(null)
    const {active, over} = event;
    if (!over) return;

    const activeColumnId = active.id
    const overColumnId = over.id

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
        const activeColumnIndex = columns.findIndex(
            (col) => col.id === activeColumnId
        )
        const overColumnIndex = columns.findIndex(
            (col) => col.id === overColumnId
        )
        return arrayMove(columns, activeColumnIndex, overColumnIndex)
    })
  }

  function onDragOver(event: DragOverEvent){
    const {active, over} = event;
    if (!over) return;

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task"
    const isOverATask = over.data.current?.type === "Task"

    if(!isActiveATask) return
    if (isActiveATask && isOverATask){
        setTasks(tasks => {
            const activeIndex = tasks.findIndex((t) => t.id === activeId)
            const overIndex = tasks.findIndex((t) => t.id === overId)

            
                tasks[activeIndex].columnId = tasks[overIndex].columnId
          
            return arrayMove(tasks, activeIndex, overIndex)
        })
    }
    const isOverAColumn = over.data.current?.type === "Column"
    if (isActiveATask && isOverAColumn){
        setTasks(tasks => {
            const activeIndex = tasks.findIndex((t) => t.id === activeId)

                tasks[activeIndex].columnId = overId
          
            return arrayMove(tasks, activeIndex, activeIndex)
        })
    }
  }

function genereteId(){
    // generate rnd number(0-10000)
    return Math.floor(Math.random()*10001)
  }
}

export default KanbanBoard