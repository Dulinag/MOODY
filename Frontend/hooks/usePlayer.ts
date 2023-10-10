import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  volume: number;
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  setVolume: (volume: number) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  volume:0.5,
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined }),
  setVolume: (vol:number) => set({volume:vol})
}));

export default usePlayer;