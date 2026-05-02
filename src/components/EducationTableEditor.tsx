import React, { useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import { Education, EducationTableLayout } from '../types';

interface Props {
  rows: Education[];
  layout: EducationTableLayout;
  onChangeRow: (index: number, value: Education) => void;
  onRemoveRow: (index: number) => void;
  onResizeColumns: (nextWidths: EducationTableLayout['columnWidths']) => void;
  onResizeRow: (index: number, nextHeight: number) => void;
}

type DragState =
  | {
      type: 'column';
      index: number;
      startX: number;
      startWidths: EducationTableLayout['columnWidths'];
      tableWidth: number;
    }
  | {
      type: 'row';
      index: number;
      startY: number;
      startHeight: number;
    }
  | null;

const MIN_COLUMN_WIDTH = 12;
const MIN_ROW_HEIGHT = 72;

export const EducationTableEditor: React.FC<Props> = ({
  rows,
  layout,
  onChangeRow,
  onRemoveRow,
  onResizeColumns,
  onResizeRow,
}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<DragState>(null);

  useEffect(() => {
    const stopDrag = () => {
      dragStateRef.current = null;
    };

    const handleMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState) {
        return;
      }

      if (dragState.type === 'column') {
        const deltaPercent = ((event.clientX - dragState.startX) / dragState.tableWidth) * 100;
        const [first, second, third, fourth] = dragState.startWidths;
        const widths = [first, second, third, fourth] as EducationTableLayout['columnWidths'];
        const leftIndex = dragState.index;
        const rightIndex = dragState.index + 1;
        const leftStart = widths[leftIndex];
        const rightStart = widths[rightIndex];
        const total = leftStart + rightStart;
        const nextLeft = Math.min(Math.max(leftStart + deltaPercent, MIN_COLUMN_WIDTH), total - MIN_COLUMN_WIDTH);
        widths[leftIndex] = nextLeft;
        widths[rightIndex] = total - nextLeft;
        onResizeColumns(widths);
        return;
      }

      if (dragState.type === 'row') {
        const nextHeight = Math.max(MIN_ROW_HEIGHT, dragState.startHeight + (event.clientY - dragState.startY));
        onResizeRow(dragState.index, nextHeight);
      }
    };

    const handleUp = () => {
      stopDrag();
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
    };
  }, [onResizeColumns, onResizeRow]);

  const startColumnResize = (index: number, event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const tableWidth = tableRef.current?.getBoundingClientRect().width ?? 1;
    dragStateRef.current = {
      type: 'column',
      index,
      startX: event.clientX,
      startWidths: [...layout.columnWidths] as EducationTableLayout['columnWidths'],
      tableWidth,
    };
  };

  const startRowResize = (index: number, event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragStateRef.current = {
      type: 'row',
      index,
      startY: event.clientY,
      startHeight: layout.rowHeights[index] ?? MIN_ROW_HEIGHT,
    };
  };

  return (
    <div ref={tableRef} className="w-full overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <table className="w-full table-fixed border-separate border-spacing-0">
        <colgroup>
          <col width={`${layout.columnWidths[0]}%`} />
          <col width={`${layout.columnWidths[1]}%`} />
          <col width={`${layout.columnWidths[2]}%`} />
          <col width={`${layout.columnWidths[3]}%`} />
        </colgroup>
        <thead>
          <tr className="bg-iith-blue/5 text-xs font-semibold uppercase tracking-wider text-iith-blue">
            {['Degree/Certificate', 'Institute/Board', 'CGPA/Percentage', 'Year'].map((label, index) => (
              <th key={label} className="group relative border-r border-iith-blue/10 px-3 py-3 text-left last:border-r-0">
                <div className="pr-4">{label}</div>
                {index < 3 && (
                  <button
                    type="button"
                    aria-label={`Resize ${label} column`}
                    onPointerDown={(event) => startColumnResize(index, event)}
                    className="absolute right-[-8px] top-0 z-10 flex h-full w-4 cursor-col-resize touch-none items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <span className="h-8 w-2 rounded-full bg-iith-blue/25 shadow-sm ring-1 ring-white/70" />
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              {...({ height: layout.rowHeights[index] ?? MIN_ROW_HEIGHT } as any)}
              className="group relative border-t border-zinc-200 align-top"
            >
              <td className="relative border-r border-zinc-200 p-2 align-top group">
                <input
                  type="text"
                  value={row.degree}
                  onChange={(event) => onChangeRow(index, { ...row, degree: event.target.value })}
                  className="h-full w-full rounded-md border border-zinc-200 bg-zinc-50 px-2 py-2 text-sm outline-none transition-colors focus:border-iith-blue focus:ring-2 focus:ring-iith-blue/10"
                  placeholder="Degree/Certificate"
                />
              </td>
              <td className="relative border-r border-zinc-200 p-2 align-top group">
                <input
                  type="text"
                  value={row.institute}
                  onChange={(event) => onChangeRow(index, { ...row, institute: event.target.value })}
                  className="h-full w-full rounded-md border border-zinc-200 bg-zinc-50 px-2 py-2 text-sm outline-none transition-colors focus:border-iith-blue focus:ring-2 focus:ring-iith-blue/10"
                  placeholder="Institute/Board"
                />
              </td>
              <td className="relative border-r border-zinc-200 p-2 align-top group">
                <input
                  type="text"
                  value={row.cgpa}
                  onChange={(event) => onChangeRow(index, { ...row, cgpa: event.target.value })}
                  className="h-full w-full rounded-md border border-zinc-200 bg-zinc-50 px-2 py-2 text-sm outline-none transition-colors focus:border-iith-blue focus:ring-2 focus:ring-iith-blue/10"
                  placeholder="CGPA/Percentage"
                />
              </td>
              <td className="relative p-2 align-top group">
                <div className="flex h-full items-start gap-2">
                  <input
                    type="text"
                    value={row.year}
                    onChange={(event) => onChangeRow(index, { ...row, year: event.target.value })}
                    className="h-full w-full rounded-md border border-zinc-200 bg-zinc-50 px-2 py-2 text-sm outline-none transition-colors focus:border-iith-blue focus:ring-2 focus:ring-iith-blue/10"
                    placeholder="Year"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveRow(index)}
                    title="Remove education row"
                    className="mt-1 rounded-md p-1 text-zinc-400 transition-colors hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  aria-label={`Resize row ${index + 1}`}
                  onPointerDown={(event) => startRowResize(index, event)}
                  className="absolute bottom-[-8px] left-0 right-0 z-10 flex h-4 cursor-row-resize touch-none items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <span className="h-2 w-10 rounded-full bg-zinc-300 shadow-sm ring-1 ring-white/70" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};