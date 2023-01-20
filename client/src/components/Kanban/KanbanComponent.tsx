import React, {useState} from 'react';
import cl from './KanbanComponent.module.css'

interface IBoard {
    id: string,
    title: string,
    items: IBoardTask[]
}

interface IBoardTask {
    id: string,
    title: string,
}

const KanbanComponent = () => {
    const [boards, setBoards] = useState<IBoard[]>([
        {
            id: '1',
            title: 'Первая',
            items: [{id: '11', title: '1. Задача с первой доски'}, {id: '12', title: '2. Задача с первой доски'}]
        },
        {id: '2', title: 'Вторая', items: [{id: '21', title: '1. Задача со второй доски'}]},
        // {id: '3', title: 'Третья', items: [{id: '31', title: 'firstTask'}]},
        // {id: '4', title: 'Четвертая', items: [{id: '41', title: 'firstTask'}]},
    ])

    const [currentBoard, setCurrentBoard] = useState<IBoard>({} as IBoard)
    const [currentItem, setCurrentItem] = useState<IBoardTask>({} as IBoardTask)

    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        //@ts-ignore
        e.target.style.boxShadow = '0 2px 3px gray'
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        //@ts-ignore
        e.target.style.boxShadow = 'none'
    }

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IBoardTask) {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        //@ts-ignore
        e.target.style.boxShadow = 'none'
    }


    function dropHandler(e: React.DragEvent<HTMLDivElement>, board: IBoard, item: IBoardTask) {
        e.stopPropagation()
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }


    function dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: IBoard) {
        e.preventDefault()
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b
        }))
    }

    return (
        <div className={cl.kanban}>
            <button onClick={() => {
                const title = prompt('Имя доски')
                setBoards([...boards, {id: `${boards.length + 1}`, title: String(title), items: []}])
            }}>Создать доску
            </button>
            <button onClick={() => {
                const title = prompt('ЗАДАЧА')
                setBoards(boards.map((b, index) => {
                    if (index === 0) {
                        return {
                            ...b,
                            items: [...b.items, {id: `${Math.random()}`, title: String(title)}]
                        }
                    }
                    return b
                }))
            }}>Создать Задачу
            </button>
            {boards.map(board =>
                <div key={board.id} className={cl.board}
                     onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                     onDrop={(e: React.DragEvent<HTMLDivElement>) => dropCardHandler(e, board)}
                >
                    <div className={cl.boardTitle}>
                        {board.title}
                    </div>
                    {board.items.map(item =>
                        <div
                            key={item.id}
                            className={cl.item}
                            draggable={true}
                            onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverHandler(e)}
                            onDragLeave={(e: React.DragEvent<HTMLDivElement>) => dragLeaveHandler(e)}
                            onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartHandler(e, board, item)}
                            onDragEnd={(e: React.DragEvent<HTMLDivElement>) => dragEndHandler(e)}
                            onDrop={(e: React.DragEvent<HTMLDivElement>) => dropHandler(e, board, item)}
                        >
                            {item.title}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default KanbanComponent;
