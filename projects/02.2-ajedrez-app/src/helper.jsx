export const getCharacter = file => String.fromCharCode(file + 96)

export const createBoard = ()=> {

    const position = Array(8).fill('').map(()=>Array(8).fill(''))
    const par = [0,7];
    const whites = ['wr','wh','wb','wq','wk','wb','wh','wr']
    const blacks = ['br','bh','bb','bq','bk','bb','bh','br']
    
    // position[0][0]='wr'
    // position[0][7]='wr'
    // position[7][0]='br'
    // position[7][7]='br'
    // position[7][5]='wk'
    // position[7][7]='bk'
    for (let i = 0; i < position.length; i++) {
        position[1][i]= 'wp'
        position[6][i]= 'bp'
    }
    for (let i of par) {
        for (let j=0; j < 8; j++) {
            position[i][j] = i == 0 ? whites[j] : blacks[j]
        }
    }
    return position
}


export const copyBoard = position => {
    const newPosition = Array(8).fill('').map(()=>Array(8).fill(''))

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            newPosition[row][column] = position[row][column]
        }
    }
    return newPosition
}

export const areSameColorTiles = (coords1,coords2)=> 
    (coords1.x + coords1.y) % 2 === (coords2.x + coords2.y) % 2

export const findPiecesCoord = (position,type)=> {
    let results = []
    position.forEach((row,i)=> {
        row.forEach((pos,j)=> {
            if (pos === type)
                results.push({x:i,y:j})
        })
    })
    return results
}

export const getNewMoveNotation = ({piece,row,column,x,y,position,promotesTo})=> {
    let note = ''

    row = Number(row)
    column = Number(column)

    if (piece[1] === 'k' && Math.abs(column-2) === 2) {
        if (column > y)
            return '0-0'
        else
            return '0-0-0'
    }

    if (piece[1] !== 'p') {
        note += piece[1].toUpperCase()
        if (position[x][y]) {
            note += 'x'
        }
    }
    else if (row !== x && column !== y) {
        note += getCharacter(column+1) + 'x'
    }

    note += getCharacter(y+1) + (x +1)

    if (promotesTo)
        note += '=' + promotesTo.toUpperCase()

    return note
}