import { describe, expect, it,vi } from "vitest";
import {printTree } from "../../../src/index";
describe('printTree', () => {
  it('should print tree correctly', () => {
    const mockConsole = vi.spyOn(console, 'log').mockImplementation(() => {})
    const tree = {
      value: 'root',
      children: [
        { value: 'child1' },
        { value: 'child2', children: [{ value: 'grandchild' }] },
      ],
    }


    printTree(tree)

    expect(mockConsole).toHaveBeenCalledWith('└── root')
    expect(mockConsole).toHaveBeenCalledWith('    ├── child1')
    expect(mockConsole).toHaveBeenCalledWith('    └── child2')
    expect(mockConsole).toHaveBeenCalledWith('        └── grandchild')

    mockConsole.mockRestore()
  })
})
