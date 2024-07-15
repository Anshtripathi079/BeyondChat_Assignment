export interface tabsData {
  id: number;
  content: string;
  value: number;
  active: boolean;
}

export const tabsData: tabsData[] = [
  {
    id: 1,
    content: "All",
    value: 100,
    active: true,
  },
  {
    id: 2,
    content: "Ongoing",
    value: 6,
    active: false,
  },
  {
    id: 3,
    content: "Ended",
    value: 15,
    active: false,
  },
  {
    id: 4,
    content: "Collections",
    value: 5,
    active: false,
  },
  {
    id: 5,
    content: "Personal",
    value: 2,
    active: false,
  },
];
