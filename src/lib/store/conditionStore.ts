import { ConditionBlockMap, SubSection, BlockRelation } from '@/app/(root)/dashboard/strategy-builder/_components/StrategyNavbar/NodeSheet/ConditionNodeSheet/types';
import { create } from 'zustand';

interface ConditionStore {
  conditionBlocks: ConditionBlockMap;
  createConditionBlock: (nodeId: string) => void;
  addBlock: (nodeId: string) => void;
  removeBlock: (nodeId: string, blockId: string) => void;
  addSubSection: (nodeId: string, blockId: string) => void;
  updateSubSection: (
    nodeId: string,
    blockId: string,
    subSectionId: number,
    field: keyof SubSection,
    value: string
  ) => void;
  removeSubSection: (nodeId: string, blockId: string, subSectionId: number) => void;
  toggleAddBadge: (nodeId: string, blockId: string, subSectionId: number) => void;
  updateBlockRelation: (nodeId: string, index: number) => void;
}

export const useConditionStore = create<ConditionStore>((set) => ({
  conditionBlocks: {},

  createConditionBlock: (nodeId: string) =>
    set((state) => ({
      conditionBlocks: {
        ...state.conditionBlocks,
        [nodeId]: {
          blocks: [
            {
              id: `block-${Date.now()}`,
              subSections: [
                {
                  id: 0,
                  addBadge: "AND",
                  lhs: "",
                  operator: "",
                  rhs: "",
                },
              ],
              relation: "AND",
            },
          ],
          blockRelations: [],
        },
      },
    })),

  addBlock: (nodeId: string) =>
    set((state) => {
      const currentNode = state.conditionBlocks[nodeId];
      if (!currentNode) return state;

      return {
        conditionBlocks: {
          ...state.conditionBlocks,
          [nodeId]: {
            ...currentNode,
            blocks: [
              ...currentNode.blocks,
              {
                id: `block-${Date.now()}`,
                subSections: [
                  {
                    id: 0,
                    addBadge: "AND",
                    lhs: "",
                    operator: "",
                    rhs: "",
                  },
                ],
                relation: "AND",
              },
            ],
            blockRelations: [...currentNode.blockRelations, "AND"],
          },
        },
      };
    }),

  removeBlock: (nodeId: string, blockId: string) =>
    set((state) => {
      const currentNode = state.conditionBlocks[nodeId];
      if (!currentNode) return state;

      const blockIndex = currentNode.blocks.findIndex(block => block.id === blockId);
      const newBlocks = currentNode.blocks.filter(block => block.id !== blockId);
      const newBlockRelations = [...currentNode.blockRelations];
      if (blockIndex !== -1) {
        newBlockRelations.splice(blockIndex - 1, 1);
      }

      return {
        conditionBlocks: {
          ...state.conditionBlocks,
          [nodeId]: {
            ...currentNode,
            blocks: newBlocks,
            blockRelations: newBlockRelations,
          },
        },
      };
    }),

  addSubSection: (nodeId: string, blockId: string) =>
    set((state) => {
      const currentNode = state.conditionBlocks[nodeId];
      if (!currentNode) return state;

      return {
        conditionBlocks: {
          ...state.conditionBlocks,
          [nodeId]: {
            ...currentNode,
            blocks: currentNode.blocks.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    subSections: [
                      ...block.subSections,
                      {
                        id: block.subSections.length,
                        addBadge: "AND",
                        lhs: "",
                        operator: "",
                        rhs: "",
                      },
                    ],
                  }
                : block
            ),
          },
        },
      };
    }),

  updateSubSection: (nodeId, blockId, subSectionId, field, value) =>
    set((state) => {
      const currentNode = state.conditionBlocks[nodeId];
      if (!currentNode) return state;

      return {
        conditionBlocks: {
          ...state.conditionBlocks,
          [nodeId]: {
            ...currentNode,
            blocks: currentNode.blocks.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    subSections: block.subSections.map((subSection) =>
                      subSection.id === subSectionId
                        ? { ...subSection, [field]: value }
                        : subSection
                    ),
                  }
                : block
            ),
          },
        },
      };
    }),

  removeSubSection: (nodeId: string, blockId: string, subSectionId: number) =>
    set((state) => {
      const currentNode = state.conditionBlocks[nodeId];
      if (!currentNode) return state;

      return {
        conditionBlocks: {
          ...state.conditionBlocks,
          [nodeId]: {
            ...currentNode,
            blocks: currentNode.blocks.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    subSections: block.subSections.filter(
                      (subSection) => subSection.id !== subSectionId
                    ),
                  }
                : block
            ),
          },
        },
      };
    }),

  toggleAddBadge: (nodeId: string, blockId: string, subSectionId: number) =>
    set((state) => {
      const currentNode = state.conditionBlocks[nodeId];
      if (!currentNode) return state;

      return {
        conditionBlocks: {
          ...state.conditionBlocks,
          [nodeId]: {
            ...currentNode,
            blocks: currentNode.blocks.map((block) =>
              block.id === blockId
                ? {
                    ...block,
                    subSections: block.subSections.map((subSection) =>
                      subSection.id === subSectionId
                        ? {
                            ...subSection,
                            addBadge: subSection.addBadge === "AND" ? "OR" : "AND",
                          }
                        : subSection
                    ),
                  }
                : block
            ),
          },
        },
      };
    }),

  updateBlockRelation: (nodeId: string, index: number) =>
    set((state) => {
      const currentNode = state.conditionBlocks[nodeId];
      if (!currentNode) return state;

      const newBlockRelations = [...currentNode.blockRelations];
      newBlockRelations[index] = newBlockRelations[index] === "AND" ? "OR" : "AND";

      return {
        conditionBlocks: {
          ...state.conditionBlocks,
          [nodeId]: {
            ...currentNode,
            blockRelations: newBlockRelations,
          },
        },
      };
    }),
}));