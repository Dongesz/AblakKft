// ColumnContainer.tsx
import React from "react" // 🔸 opcionális, de a React.CSSProperties típus miatt jó ha van
import { useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../icons/TrashIcon";
import type { Column, Id } from "../types"
import { CSS } from "@dnd-kit/utilities"

interface Props{
  column: Column;
  deleteColumn: (id: Id) => void;
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  })

  // 🔸 VÁLTOZÁS: style objektum mindig számítva van
  const style: React.CSSProperties = {
    transition,                               // 🔸 kell a smooth animációhoz
    transform: CSS.Transform.toString(transform), // 🔸 pozíció átadás a dnd-kit-nek
  };

  // 🔸 MEGTARTOTTAM az if ágat, de biztosítom, hogy a ref+style MINDKÉT ágban rajta legyen
  if (isDragging)
  {
    return (
      <div
        ref={setNodeRef}          // 🔸 fontos: ref a rooton (most is itt van)
        style={style}             // 🔸 és a style is a rooton (most is itt van)
        className="
          bg-columnBackgroundColor
          opacity-60
          border-2
          border-rose-500
          w-[350px]
          h-[500px]
          max-h-[500px]
          rounded-md
          flex
          flex-col
        "
      >
        {/* Ha akarod, ide tehetsz egy egyszerű overlay/placeholder tartalmat */}
      </div>
    )
  }

  // 🔸 NEM TÖRÖLTEM az if-et — csak a normál ág rootján is alkalmazom a ref+style-t
  return (
    <div
      ref={setNodeRef}          // 🔸 EZ A LÉNYEG: ref a normál rooton is
      style={style}             // 🔸 és style itt is, hogy a dnd-kit tudja animálni a visszahelyezést
      className="
        bg-columnBackgroundColor
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
      "
    >
      <div
        {...attributes}
        {...listeners}
        className="
          bg-mainBackgroundColor
          text-md
          h-[60px]
          cursor-grab
          rounded-md
          rounded-b-none
          p-3
          font-bold
          border-columnBackgroundColor
          border-4
          flex
          items-center
          justify-between
        "
      >
        <div className="flex gap-2">
          <div
            className="
              flex
              justify-center
              items-center
              bg-columnBackgroundColor
              px-2
              py-1
              text-sm
              rounded-full
            "
          >
            0
          </div>
          {column.title}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id)
          }}
          className="
            stroke-gray-500
            hover:stroke-white
            hover:bg-columnBackgroundColor
            rounded
            px-1
            py-2
          "
        >
          <TrashIcon/>
        </button>
      </div>

      <div className="flex flex-grow p-3">Content</div>
    </div>
  )
}

export default ColumnContainer
