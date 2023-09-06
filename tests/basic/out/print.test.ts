import { describe, expect, it,vi } from "vitest";
import {TreeData} from "../../../src/index";
describe('printTree', () => {
  it('look',()=>{
    const tree = {
      value: 'root',
      children: [
        { value: 'child1', children: [{ value: 'grandchild', children: [{ value: 'grandchild', children: [{ value: 'grandchild', children: [{ value: 'grandchild', children: [{ value: 'grandchild' }] },{ value: 'grandchild' },{ value: 'grandchild' }] }] }] }] },
        { value: 'child2', children: [{ value: 'grandchild' }] },
      ],
    }
    TreeData.printTree(tree)
  })
  it('should print tree correctly', () => {
    const mockConsole = vi.spyOn(console, 'log').mockImplementation(() => {})
    const tree = {
      value: 'root',
      children: [
        { value: 'child1' },
        { value: 'child2', children: [{ value: 'grandchild' }] },
      ],
    }


    TreeData.printTree(tree)

    expect(mockConsole).toHaveBeenCalledWith('└── root')
    expect(mockConsole).toHaveBeenCalledWith('    ├── child1')
    expect(mockConsole).toHaveBeenCalledWith('    └── child2')
    expect(mockConsole).toHaveBeenCalledWith('        └── grandchild')

    mockConsole.mockRestore()
  })
})
