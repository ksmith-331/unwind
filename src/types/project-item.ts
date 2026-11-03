type ProjectItemBase = {
  id: string;
  title: string;
};

type ProjectItemKind = 'pattern' | 'tutorial';

export type InProgressProjectItem = ProjectItemBase & {
  kind: ProjectItemKind;
  status: 'inProgress';
  progress: number;
};

export type TodoProjectItem = ProjectItemBase & {
  kind: ProjectItemKind;
  status: 'todo';
};

export type ProjectItem = InProgressProjectItem | TodoProjectItem;
