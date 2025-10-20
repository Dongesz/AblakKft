import { useMemo, useState, useEffect } from "react"
import PlusIcon from "../icons/PlusIcon"
import type { Column, Id, Task } from "../types"
import ColumnContainer from "./ColumnContainer"
import Toasts from './Toasts'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext } from "@dnd-kit/sortable"
import { createPortal } from "react-dom"
import TaskCard from "./TaskCard"
import { getAllOrders, orderToTask, createOrder, updateOrder, deleteOrder, getOrderById } from "../services/orders"
import OrderDetailsPanel from "./OrderDetailsPanel"


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
    const [regions, setRegions] = useState<string[]>(["all", "Budapest", "Pest", "Fejér", "Győr-Moson-Sopron"])
    const [toasts, setToasts] = useState<Array<{id:string; message:string; type?: 'info'|'success'|'error'}>>([])
    const pushToast = (message: string, type: 'info'|'success'|'error' = 'success') => {
        const t = { id: Date.now().toString(), message, type }
        setToasts(prev => [...prev, t])
    }
    const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)
    const [dropTargetColumnId, setDropTargetColumnId] = useState<Id | null>(null)
    const [openOrderId, setOpenOrderId] = useState<number | null>(null)
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            }
        })
    )
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        (async () => {
            setLoading(true)
            setError(null)
            try {
                const orders = await getAllOrders();
                const mapped = (orders || []).map(orderToTask);
                setTasks(mapped as Task[]);
                // build dynamic region list from loaded tasks
                const found = Array.from(new Set(mapped.map(m => m.region).filter(Boolean))) as string[]
                setRegions(prev => Array.from(new Set(["all", ...found, ...prev.filter(r => r !== 'all')])) )
            } catch (err: any) {
                console.error("Failed to load orders:", err);
                setError(err?.message ?? String(err))
                setTasks([])
                pushToast('Hiba a rendelések betöltésekor', 'error')
            } finally {
                setLoading(false)
            }
        })()
    }, [])
  
    // render loading / error states
    if (loading) return <div className="p-8">Loading orders...</div>
    if (error) return <div className="p-8 text-red-500">Error loading orders: {error}</div>
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
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={(e) => { onDragEnd(e); onDragEndPersist(e); setDropTargetColumnId(null); }} onDragOver={onDragOver}>
        <div className="mb-4 flex items-center gap-4">
            <label className="text-sm font-medium">Szűrés megye szerint:</label>
            <div className="relative">
                <select className="appearance-none bg-white dark:bg-black border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                    {regions.map(r => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">▾</div>
            </div>
        </div>
        <Toasts toasts={toasts} remove={removeToast} />
        <div className="m-auto flex gap-4">
            <div className="flex gap-4">
                <SortableContext items={columnsId}>
                {columns.map((col) => (
                    <ColumnContainer 
                        key={col.id}
                        column={col}
                        isDropTarget={String(dropTargetColumnId) === String(col.id)}
                        deleteColumn={deleteColumn}
                        updateColumn={updateColumn}
                        createTask={createTask}
                        tasks = {tasks.filter(task => ((String(task.columnId) === String(col.id) || task.columnId === col.title) && (selectedRegion === 'all' || task.region === selectedRegion))).slice().sort((a,b)=> (b.createdAt||'').localeCompare(a.createdAt||''))}
                        deleteTask={deleteTask}
                        onOpenDetails={(id) => setOpenOrderId(typeof id === 'number' ? id : null)}
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
                    tasks = {tasks.filter(task => (String(task.columnId) === String(activeColumn.id) || task.columnId === activeColumn.title)).slice().sort((a,b)=> (b.createdAt||'').localeCompare(a.createdAt||''))}
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
        {openOrderId !== null && (
            <OrderDetailsPanel orderId={openOrderId} onClose={() => setOpenOrderId(null)} />
        )}
        
        </DndContext>
    </div>
    
  )

    function createTask(columnId: Id)
  {
        (async () => {
            // If columnId is numeric (unlikely for columns), fallback to title
            const status = typeof columnId === 'string' ? columnId : String(columnId)
                    try {
                    const dto = {
                        userId: 1,
                        productId: 1,
                        quantity: 1,
                        shipping_adress: 'Unknown',
                        status: status,
                        order_date: new Date().toISOString(),
                    }
                    const created = await createOrder(dto as any)
                    const task = orderToTask(created)
                    setTasks(prev => [...prev, task])
                        pushToast('Rendelés létrehozva', 'success')
            } catch (err) {
                // fallback to local demo task
                const newTask: Task = {
                        id: genereteId(),
                        columnId,
                        content: `Task ${tasks.length + 1}`,
                        region: selectedRegion === 'all' ? 'Budapest' : selectedRegion,
                        createdAt: new Date().toISOString(),
                }
                setTasks(prev => [...prev, newTask])
            }
        })()
  }

    function deleteTask(id:Id){
        // confirm deletion with the user
        if (!confirm('Biztosan törlöd a rendelést?')) return;
        (async () => {
            try {
                if (typeof id === 'number') {
                    await deleteOrder(id)
                }
                pushToast('Rendelés törölve', 'success')
            } catch (err) {
                console.error('Failed to delete order:', err)
                pushToast('Hiba a törlés során', 'error')
            } finally {
                const newTasks = tasks.filter((task) => task.id !== id)
                setTasks(newTasks);
            }
        })()
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

    // Only handle column reordering here (when dragging columns)
    if (active.data.current?.type === 'Column' && over.data.current?.type === 'Column') {
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
  }

    // Persist cross-column moves on drag end for tasks
    function onDragEndPersist(event: DragEndEvent){
        const {active, over} = event
        if (!over) return
        // if dropped on a column
        const isActiveTask = active.data.current?.type === 'Task'
        const isOverColumn = over.data.current?.type === 'Column'
        const isOverTask = over.data.current?.type === 'Task'
        if (!isActiveTask || !(isOverColumn || isOverTask)) return

        const taskId = active.id
        // if dropped over a task, derive the column from that task
        const targetColumnId = isOverColumn ? over.id : (over.data.current?.task?.columnId ?? over.id)

        setTasks(prev => {
            const idx = prev.findIndex(t => t.id === taskId)
            if (idx === -1) return prev
            const prevColumn = prev[idx].columnId
            const newTasks = prev.slice()
            newTasks[idx] = { ...newTasks[idx], columnId: targetColumnId };

            // optimistic update persisted below
            (async () => {
                const moved = newTasks[idx]
                if (typeof moved.id === 'number'){
                    const orderId = moved.id as number
                    const col = columns.find(c => String(c.id) === String(targetColumnId))
                    const newStatus = col ? col.title : (typeof targetColumnId === 'string' ? targetColumnId : String(targetColumnId))
                    try {
                        const order = await getOrderById(orderId)
                        const dto = {
                            userId: order.userId || 1,
                            productId: order.productId || 1,
                            quantity: order.quantity || 1,
                            shipping_adress: order.shipping_adress || 'Unknown',
                            status: newStatus,
                            order_date: order.order_date || new Date().toISOString(),
                        }
                        await updateOrder(orderId, dto as any)
                        pushToast('Rendelés státusza frissítve', 'success')
                    } catch (err) {
                        console.error('Failed to persist order status:', err)
                        pushToast('Hiba: státusz mentése sikertelen', 'error')
                        // revert
                        setTasks(current => {
                            const i = current.findIndex(t => t.id === taskId)
                            if (i === -1) return current
                            const reverted = current.slice()
                            reverted[i] = { ...reverted[i], columnId: prevColumn }
                            return reverted
                        })
                    }
                }
            })()

            return newTasks
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

    // if hovering over a column, mark it as drop target so the column shows hover state
    if (over.data.current?.type === 'Column'){
        setDropTargetColumnId(over.id)
    } else if (isOverATask){
        // if hovering over a task, derive its columnId and mark that column as drop target
        const taskColumn = over.data.current?.task?.columnId
        setDropTargetColumnId(taskColumn ?? null)
    } else {
        setDropTargetColumnId(null)
    }

    if (isActiveATask && isOverATask){
        setTasks(prev => {
            const activeIndex = prev.findIndex((t) => t.id === activeId)
            const overIndex = prev.findIndex((t) => t.id === overId)
            if (activeIndex === -1 || overIndex === -1) return prev

            // only reorder within the same column visually
            const sourceCol = prev[activeIndex].columnId
            const targetCol = prev[overIndex].columnId
            if (String(sourceCol) !== String(targetCol)) return prev

            const copy = prev.slice()
            // move the item in the array
            copy[activeIndex] = { ...copy[activeIndex], columnId: sourceCol }
            return arrayMove(copy, activeIndex, overIndex)
        })
    }
        // Do not persist on dragOver. Only visually reorder within columns here.
        // Final persistence will happen on drag end.
  }

function genereteId(){
    // generate rnd number(0-10000)
    return Math.floor(Math.random()*10001)
  }
}

export default KanbanBoard