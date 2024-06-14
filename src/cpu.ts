export type Stack = number[];

type Condition = '+' | '-';

export type Instruction =
  | {line: number; op: 'push'; operand: number; cond?: Condition}
  | {line: number; op: 'drop'; cond?: Condition}
  | {line: number; op: 'eq'; cond?: Condition}
  | {line: number; op: 'ne'; cond?: Condition}
  | {line: number; op: 'gt'; cond?: Condition}
  | {line: number; op: 'ge'; cond?: Condition}
  | {line: number; op: 'lt'; cond?: Condition}
  | {line: number; op: 'le'; cond?: Condition}
  | {line: number; op: 'add'; cond?: Condition}
  | {line: number; op: 'sub'; cond?: Condition}
  | {line: number; op: 'noop'; cond?: Condition};

// 1. Optional + or - for conditions
// 2. Instruction
// 3. Operands, which is a space-separated list of numbers
//
//                   1        2           3
//                ┏━━┻━━┓   ┏━┻━┓   ┏━━━━━┻━━━━━┓
const pattern = /^([+-])?\s*(\w+)\s*((?:\d+\s*)*)$/;

export function parse(code: string): Instruction[] {
  const lines = code.split('\n');
  const output: Instruction[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.replace(/#.+$/, '').trim();

    if (!trimmed) {
      continue;
    }

    const matches = trimmed.match(pattern);

    if (!matches) {
      throw new Error('Invalid instruction!');
    }

    const [, cond, operator, raw_operands = ''] = matches;
    const operands = raw_operands.split(/\s/).map(Number);

    switch (operator) {
      case 'push': {
        output.push({
          line: i,
          cond: cond as Condition,
          op: operator,
          operand: operands[0],
        });
        break;
      }
      case 'add':
      case 'sub':
      case 'drop':
      case 'eq':
      case 'ne':
      case 'gt':
      case 'lt':
        output.push({line: i, cond: cond as Condition, op: operator});
    }
  }

  return output;
}

export function execute(instruction: Instruction, stack: Stack): Stack {
  // Truthy conditional
  if (instruction.cond === '+') {
    // If falsey, don't execute the instruction.
    if (stack[0] === 0) {
      return stack;
    }
  }

  // Falsey conditional
  if (instruction.cond === '-') {
    // If truthy, don't execute the instruction.
    if (stack[0] > 0) {
      return stack;
    }
  }

  switch (instruction.op) {
    case 'add': {
      const [a, b, ...rest] = stack;
      return [a + b, ...rest];
    }
    case 'drop': {
      const [, ...rest] = stack;
      return rest;
    }
    case 'push': {
      return [instruction.operand, ...stack];
    }
    case 'sub': {
      const [a, b, ...rest] = stack;
      return [a - b, ...rest];
    }
    case 'eq': {
      const [a, b, ...rest] = stack;
      return [a === b ? 1 : 0, ...rest];
    }
    case 'ne': {
      const [a, b, ...rest] = stack;
      return [a !== b ? 1 : 0, ...rest];
    }
    case 'gt': {
      const [a, b, ...rest] = stack;
      return [a > b ? 1 : 0, ...rest];
    }
    case 'ge': {
      const [a, b, ...rest] = stack;
      return [a >= b ? 1 : 0, ...rest];
    }
    case 'lt': {
      const [a, b, ...rest] = stack;
      return [a < b ? 1 : 0, ...rest];
    }
    case 'le': {
      const [a, b, ...rest] = stack;
      return [a <= b ? 1 : 0, ...rest];
    }
    default:
      return stack;
  }
}
