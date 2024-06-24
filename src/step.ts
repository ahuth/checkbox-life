export function step(values: number[], rowSize: number): number[] {
  // Clone the values so we don't modify the list we're counting, which would mess up the counts.
  const clone = values.slice();

  for (let i = 0; i < values.length; i++) {
    const neighborsCount = countNeighbors(i, rowSize, values);

    if (neighborsCount < 2) {
      clone[i] = 0;
    } else if (neighborsCount === 3) {
      clone[i] = 1;
    } else if (neighborsCount > 3) {
      clone[i] = 0;
    }
  }

  return clone;
}

function countNeighbors(
  index: number,
  rowSize: number,
  values: readonly number[],
): number {
  const {x, y} = getCoordinates(index, rowSize);

  const n1 =
    values[
      getIndex(
        wrapAroundSize(x - 1, rowSize),
        wrapAroundSize(y - 1, rowSize),
        rowSize,
      )
    ];

  const n2 =
    values[
      getIndex(
        wrapAroundSize(x - 1, rowSize),
        wrapAroundSize(y, rowSize),
        rowSize,
      )
    ];

  const n3 =
    values[
      getIndex(
        wrapAroundSize(x - 1, rowSize),
        wrapAroundSize(y + 1, rowSize),
        rowSize,
      )
    ];

  const n4 =
    values[
      getIndex(
        wrapAroundSize(x, rowSize),
        wrapAroundSize(y - 1, rowSize),
        rowSize,
      )
    ];

  const n5 =
    values[
      getIndex(
        wrapAroundSize(x, rowSize),
        wrapAroundSize(y + 1, rowSize),
        rowSize,
      )
    ];

  const n6 =
    values[
      getIndex(
        wrapAroundSize(x + 1, rowSize),
        wrapAroundSize(y - 1, rowSize),
        rowSize,
      )
    ];

  const n7 =
    values[
      getIndex(
        wrapAroundSize(x + 1, rowSize),
        wrapAroundSize(y, rowSize),
        rowSize,
      )
    ];

  const n8 =
    values[
      getIndex(
        wrapAroundSize(x + 1, rowSize),
        wrapAroundSize(y + 1, rowSize),
        rowSize,
      )
    ];

  return n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8;
}

function getCoordinates(index: number, rowSize: number) {
  const y = Math.floor(index / rowSize);
  const x = index % rowSize;
  return {x, y};
}

function getIndex(x: number, y: number, rowSize: number): number {
  return y * rowSize + x;
}

function wrapAroundSize(coord: number, rowSize: number): number {
  if (coord < 0) {
    return rowSize - 1;
  }
  if (coord >= rowSize) {
    return 0;
  }
  return coord;
}
