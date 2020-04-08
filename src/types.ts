// will define the shape of an item on our budget apps list
export type BudgetItemObject = {
  date: string;
  isPaid: boolean;
  price: number;
  title: string;
  id: string;
};

export type BudgetList = {
  budgetCurrency: string;
  budgetItems: BudgetItemObject[];
  // event handlers
  handleItemUpdate: (value: string, id: string, itemProperty: string) => void;
  handleItemRemove: (id: string) => void;
};

export type SingleBudgetItem = {
  budgetCurrency: string;
  budgetItem: BudgetItemObject;
  // event handlers
  handleItemRemove: (id: string) => void;
  handleItemUpdate: (value: string, id: string, itemProperty: string) => void;
};

export type BudgetTotal = {
  budgetPeriod: string;
  budgetAmount: number;
  budgetPaid: number;
  budgetCurrency: string;
};

export type HomePageType = {
  // array of objects
  budgetItems: BudgetItemObject[];
  budgetAmount: number;
  budgetPeriod: string;
  budgetCurrency: string;
  storageMethod: string;
  // this will be a hook used on our homepage, it accepts a generic so the compiler knows what its doing
  setBudgetItems: React.Dispatch<React.SetStateAction<BudgetItemObject[]>>;
};

export type SettingsPage = {
  budgetAmount: number;
  budgetPeriod: string;
  budgetCurrency: string;
  storageMethod: string;
  setBudgetPeriod: React.Dispatch<React.SetStateAction<string>>;
  setBudgetCurrency: React.Dispatch<React.SetStateAction<string>>;
  setBudgetAmount: React.Dispatch<React.SetStateAction<number>>;
  setStorageMethod: React.Dispatch<React.SetStateAction<string>>;
};

export type BudgetItemAdd = {
  showAddItem: boolean;
  handleAddItem: (payload: BudgetItemObject) => void;
  handleShowItem: React.Dispatch<React.SetStateAction<boolean>>;
};
