
// Constants Constants Constants

const axis = { x: 0, y: 1 }
const directions = ['R', 'L', 'M']
const moving = { 'R': [1, 0], 'L': [-1, 0], 'M': [0, 1] }
const commands = { 'L': left, 'R': right, 'M': up }
const wrongCommand = () => console.log("Wrong command! Only 'R', 'L', or 'M' allowed")

const toLeft = (index) => (index - 1 + directions.length) % directions.length
const toRight = (index) => (index + 1) % directions.length

// Functions Functions Functions

function rover(firstState, grid, input){
  if (firstState.stopped){
    return firstState
  }

  var state = JSON.parse(JSON.stringify(firstState));

  for (var command of input){
    commands[command]? commands[command](state, grid) : wrongCommand()
      if (state.stopped){
        break
      }
  }
  return state
};

function left(state){
  turn(state, toLeft)
};

function right(state){
  turn(state, toRight)
};

function turn(state, toDirection){
  const currentIndex = directions.indexOf(state.direction)
  const newIndex = toDirection(currentIndex)
  state.direction = directions[newIndex]
};

function up(state, grid){
  moveRover(state, grid, moving)
};

function moveRover(state, grid, movements){
  var newPosition = move(state.position, movements[state.direction]);
  if (offPlateau(newPosition, grid.dimensions) || hitRover(newPosition, grid.rovers)) {
    state.stopped = true
  } else {
    state.position = newPosition
  }
};

function move(origin, movement){
  return [origin[axis.x] + movement[axis.x], origin[axis.y] + movement[axis.y] ]
};

function offPlateau(position, dimensions){
  return( (position[axis.x] < 0 )
    || (position[axis.y] < 0 )
    || (position[axis.x] >= dimensions[axis.x])
    || (position[axis.y] >= dimensions[axis.y]) )
};

function hitRover(position, rovers){
  for (var rover of rovers){
    if (overlapping(position, rover)){
      return true
    }
  }
  return false
};

function overlapping(p1, p2){
  return (p1[axis.x] === p2[axis.x]) && (p1[axis.y] === p2[axis.y])
};



module.exports = rover;
