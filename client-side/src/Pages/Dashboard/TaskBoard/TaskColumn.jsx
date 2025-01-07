import React from 'react'
import TaskCard from './TaskCard'
import DotedButton from '../Projects/DotedButton';

const TaskColumn = ({ column, tasks, onDragStart, onDragOver, onDrop, id }) => {

    const DottedButtonOptions = [
        { label: 'Add manual time', type: 'addManualTimeColumn' },
        { label: 'Edit Column name', type: 'editColumnName' },
        { label: 'Add Due Time', type: 'addDueTimeColumn' },
        { label: 'Delete', type: 'deleteColumn' },
      ];

    return (
        <div
          className="h-[36rem] flex-none w-[300px] rounded-lg bg-blue-100"
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, column.id)}
        >
          <div
            className="flex relative justify-normal items-center p-4 font-medium border-b bg-white rounded-t-lg cursor-move"
            draggable
            onDragStart={(e) => onDragStart(e, column.id, 'column')}
          >
            <h2>{column.title}</h2>
            <DotedButton options={DottedButtonOptions} top={4} right={4} cardId={column.id} projectId={id} />
          </div>
          <div className="overflow-y-scroll scrollbar-thick scrollbar-thumb-blue-500 scrollbar-track-blue-100">
            {tasks.map((task) => (
              // <TaskNewCard key={task.id} task={task} columnTitle={column.title} onDragStart={onDragStart} />
              <TaskCard key={task.id} task={task} projectId={id} columnTitle={column.title} onDragStart={onDragStart} />
            ))}
          </div>
        </div>
      );
}

export default TaskColumn