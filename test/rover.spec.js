const rover = require('../src/rover')
const expect = require("chai").expect

describe('rover', () => {

  describe('when rover is stopped', () => {
    const grid = {}
    const state = {
      stopped: true
    }

    it('should return previous state', () => {
      const input = "M"
      const result = rover(state, grid, input)
      expect(result).to.equal(state)
    });
  });

  describe('R command (turn right)', () => {
    const grid = {}
    const input = "R"

    it('should turn from M to R', () => {
      const state = {
        direction: 'M'
      }
      const result = rover(state, grid, input)
      expect(result.direction).to.equal('R')
    });

    it('should turn from L to M', () => {
      const state = {
        direction: 'L'
      }
      const result = rover(state, grid, input)
      expect(result.direction).to.equal('M')
    });
  });

  describe('L command (turn left)', () => {
    const grid = {}
    const input = "L"

    it('should turn from M to L', () => {
      const state = {
        direction: 'M'
      }
      const result = rover(state, grid, input)
      expect(result.direction).to.equal('L')
    });

    it('should turn from R to M', () => {
      const state = {
        direction: 'R'
      }
      const result = rover(state, grid, input)
      expect(result.direction).to.equal('M')
    });
  });

  describe('M command (move forward)', () => {
    const emptyGrid = {
      dimensions: [10, 10],
      rovers: []
    }
    const input = "M"

    it('should increase Y position when M', () => {
      const state = {
        position: [0, 0],
        direction: 'M'
      }
      const result = rover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([0, 1])
      expect(result.stopped).to.not.be.true
    });

    it('should decrease X position when L', () => {
      const state = {
        position: [2, 0],
        direction: 'L'
      }
      const result = rover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([1, 0])
      expect(result.stopped).to.not.be.true
    });

    it('should increase X position when R', () => {
      const state = {
        position: [0, 0],
        direction: 'R'
      }
      const result = rover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([1, 0])
      expect(result.stopped).to.not.be.true
    });

    it('should stop and keep position when M and rover is at top limit', () => {
      const state = {
        position: [0, 9],
        direction: 'M'
      }
      const result = rover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([0, 9])
      expect(result.stopped).to.be.true
    });

    it('should stop and keep position when L and rover is at left limit', () => {
      const state = {
        position: [0, 5],
        direction: 'L'
      }
      const result = rover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([0, 5])
      expect(result.stopped).to.be.true
    });

    it('should stop and keep position when R and rover is at right limit', () => {
      const state = {
        position: [9, 5],
        direction: 'R'
      }
      const result = rover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([9, 5])
      expect(result.stopped).to.be.true
    });

    it('should stop and keep position if there is a rover in same place', () => {
      const grid = {
        dimensions: [10, 10],
        rovers: [[2, 1]]
      }
      const state = {
        position: [1, 1],
        direction: 'R'
      }
      const result = rover(state, grid, input)
      expect(result.position).to.deep.equal([1, 1])
      expect(result.stopped).to.be.true
    });
  });

  describe('when avoiding the other rovers', () => {
    const grid = {
      dimensions: [10, 10],
      rovers: [[1, 2], [2, 3], [3, 4]]
    }
    const state = {
      position: [0, 0],
      direction: 'R'
    }
    const expected = {
      position: [9, 9],
      direction: 'M'
    }

    it('should go from one corner of the grid to the other diagonally', () => {
      const input = "MLMRMLMRMLMRMLMRMLMRMLMRMLMRMLMRMLM"
      const result = rover(state, grid, input)
      expect(result).to.deep.equal(expected)
    });

    it('should go from one corner of the grid to the other', () => {
      const input = "MMMMMMMMMLMMMMMMMMM"
      const result = rover(state, grid, input)
      expect(result).to.deep.equal(expected)
    });
  });

});
