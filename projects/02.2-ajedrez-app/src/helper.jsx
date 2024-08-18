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