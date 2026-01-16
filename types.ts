
export type Category = 
  | 'Image Tools' 
  | 'Design Tools' 
  | 'Dev Tools' 
  | 'Text Tools' 
  | 'Social Tools' 
  | 'Utilities' 
  | 'World Clock' 
  | 'Calendar';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  icon: React.ReactNode;
  component: React.ComponentType;
}

export interface NavGroup {
  category: Category;
  tools: Tool[];
}
