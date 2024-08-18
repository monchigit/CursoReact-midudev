import arbiter from './arbiter'

export const getRookMoves = ({ position,piece,row,column })=> {
    const moves = []
    const us = piece[0]
    const enemy = us === 'w' ? 'b' : 'w'

    const direction = [
            [1,0],
        [0,-1],  [0,1],
            [-1,0]
    ]
    direction.forEach(dir => {
        for (let i = 1; i < 8; i++) {
            const x = row + (i*dir[0])
            const y = column + (i*dir[1])
            if (position?.[x]?.[y] === undefined) break
            if (position[x][y].startsWith(enemy)) {
                moves.push([x,y])
                break
            }
            if (position[x][y].startsWith(us)) break
            moves.push([x,y])
        }
    })
    return moves
}

export const getKnightMoves = ({ position,row,column }) => {
    const moves = []
    const enemy = position[row][column].startsWith('w')  ? 'b' : 'w'

    const alloweds = [
        [-2,-1],
        [-2,1],
        [2,-1],
        [2,1],
        [-1,2],
        [1,2],
        [-1,-2],
        [1,-2]
    ]
    alloweds.forEach(c => {
        const cell = position?.[row + c[0]]?.[column + c[1]]
        if (cell !== undefined && (cell.startsWith(enemy) || cell === '')) {
            moves.push([row + c[0],column + c[1]])
        }
    })
    return moves
}

export const getBishopMoves = ({ position,piece,row,column })=> {
    const moves = []
    const us = piece[0]
    const enemy = us === 'w' ? 'b' : 'w'

    const direction = [
        [1,-1], [1,1],
        [-1,-1],[-1,1]
    ]
    direction.forEach(dir => {
        for (let i = 1; i < 8; i++) {
            const x = row + (i*dir[0])
            const y = column + (i*dir[1])
            if (position?.[x]?.[y] === undefined) break
            if (position[x][y].startsWith(enemy)) {
                moves.push([x,y])
                break
            }
            if (position[x][y].startsWith(us)) break
            moves.push([x,y])
        }
    })
    return moves
}

export const getQueenMoves = ({ position,piece,row,column })=> {
    const moves = [
        ...getRookMoves({ position,piece,row,column }),
        ...getBishopMoves({ position,piece,row,column })
    ]
    return moves
}

export const getKingMoves = ({ position,piece,row,column })=> {
    const moves = []
    const us = piece[0]

    const direction = [
        [1,-1],[1,0],[1,1],
        [0,-1],      [0,1],
        [-1,-1],[-1,0],[-1,1]
    ]
    direction.forEach(dir => {
        const x = row + dir[0]
        const y = column + dir[1]
        if (position?.[x]?.[y] !== undefined && !position[x][y].startsWith(us)) 
            moves.push([x,y])
    })
    return moves
}

export const getPawnMoves = ({ position,piece,row,column })=> {
    const moves = []
    const dir = piece === 'wp' ? 1 : -1

    if (!position?.[row+dir][column]) 
        moves.push([row+dir,column])

    if ((row === 1 && piece.startsWith('w')) || (row === 6 && piece.startsWith('b'))) {
        if (position?.[row+dir][column] === '' && position?.[row+2*dir][column] === '') 
            moves.push([row+2*dir,column])
    }
    
    return moves
}

export const getPawnCaptures = ({ position,previusPosition,piece,row,column })=> {
    const moves = []
    const dir = piece === 'wp' ? 1 : -1
    const enemy = piece[0] === 'w' ? 'b' : 'w'

    if (position?.[row+dir]?.[column-1] && position?.[row+dir][column-1].startsWith(enemy)) 
        moves.push([row+dir,column-1])

    if (position?.[row+dir]?.[column+1] && position?.[row+dir][column+1].startsWith(enemy)) 
        moves.push([row+dir,column+1])

    // in passant
    const enemyPawn = dir === 1 ? 'bp' : 'wp'
    const adjacentColumns = [column-1,column+1]
    if (previusPosition){
        if ((dir === 1 && row === 4) || (dir === -1 && row === 3)) {
            adjacentColumns.forEach(col => {
                if (position?.[row]?.[col] === enemyPawn &&
                position?.[row+2*dir]?.[col] === '' &&
                previusPosition?.[row]?.[col] === '' &&
                previusPosition?.[row+2*dir]?.[col] === enemyPawn) {
                    moves.push([row+dir,col])
                }
            })
        }
    }

    return moves
}

export const getCastlingMoves = ({position,castleDirection,piece,row,column})=> {
    const moves = []

    if (column !== 4 || row % 7 !== 0 || castleDirection === 'none')
        return moves
    if (piece.startsWith('w')) { 
        if (arbiter.isPlayerInCheck({positionAfterMove:position,player:'w'}))
            return moves
        if ((['left','both']).includes(castleDirection) &&
        !position[0][3] &&
        !position[0][2] &&
        !position[0][1] &&
        position[0][0] === 'wr' &&
        !arbiter.isPlayerInCheck({
            positionAfterMove : arbiter.performMove({position,piece,row,column,x:0,y:3}),
            player:'w'
        }) &&
        !arbiter.isPlayerInCheck({
            positionAfterMove : arbiter.performMove({position,piece,row,column,x:0,y:2}),
            player:'w'
        })
        ) {
            moves.push([0,2])
        }
        if ((['right','both']).includes(castleDirection) &&
        !position[0][5] &&
        !position[0][6] &&
        position[0][7] === 'wr' &&
        !arbiter.isPlayerInCheck({
            positionAfterMove : arbiter.performMove({position,piece,row,column,x:0,y:6}),
            player:'w'
        }) &&
        !arbiter.isPlayerInCheck({
            positionAfterMove : arbiter.performMove({position,piece,row,column,x:0,y:5}),
            player:'w'
        })
        ) {
            moves.push([0,6])
        } 
        
    } else  {
        if (arbiter.isPlayerInCheck({positionAfterMove:position,player:'b'}))
            return moves
        if ((['left','both']).includes(castleDirection) &&
        !position[7][3] &&
        !position[7][2] &&
        !position[7][1] &&
        position[7][0] === 'br' &&
        !arbiter.isPlayerInCheck({
            positionAfterMove : arbiter.performMove({position,piece,row,column,x:7,y:3}),
            player:'b'
        }) &&
        !arbiter.isPlayerInCheck({
            positionAfterMove : arbiter.performMove({position,piece,row,column,x:7,y:2}),
            player:'b'
        })
        ) {
            moves.push([7,2])
        }
        if ((['right','both']).includes(castleDirection) &&
        !position[7][5] &&
        !position[7][6] &&
        position[7][7] === 'br' &&
        !arbiter.isPlayerInCheck({
            positionAfterMove : arbiter.performMove({position,piece,row,column,x:7,y:6}),
            player:'b'
        }) &&
        !arbiter.isPlayerInCheck({
            positionAfterMove : arbiter.performMove({position,piece,row,column,x:7,y:5}),
            player:'b'
        })
        ) {
            moves.push([7,6])
        }
    }
return moves
}

export const getCastleDirection = ({castleDirection,piece,row,column})=> {
    row = Number(row)
    column = Number(column)
    const direction = castleDirection[piece[0]]
    if  (piece.endsWith('k'))
        return 'none'
    if (column === 0 && row === 0) {
        if (direction === 'both')
            return 'right'
        if (direction === 'left')
            return 'none'
    }
    if (column === 7 && row === 0) {
        if (direction === 'both')
            return 'left'
        if (direction === 'right')
            return 'none'
    }
    if (column === 0 && row === 7) {
        if (direction === 'both')
            return 'right'
        if (direction === 'left')
            return 'none'
    }
    if (column === 7 && row === 7) {
        if (direction === 'both')
            return 'left'
        if (direction === 'right')
            return 'none'
    }
}

export const getKingPos = (position,player) => {
    let kingPos 
    position.forEach((row,x) => {
        row.forEach((column,y) => {
            if (position[x][y].startsWith(player) && position[x][y].endsWith('k'))
                kingPos = [x,y]
        })
    })
    return kingPos
}

export const getPieces = (position,enemy) => {
    const enemyPieces = []
    
    position.forEach((row,x) => {
        row.forEach((column,y) => {
            if (position[x][y].startsWith(enemy))
                enemyPieces.push({
                piece:position[x][y],
                row:x,
                column:y
            })
        })
    })
    return enemyPieces
}