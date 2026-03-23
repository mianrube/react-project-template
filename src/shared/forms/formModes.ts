export type EntityFormMode = 'create' | 'edit';

export const isCreateFormMode = (mode: EntityFormMode): boolean => {
  return mode === 'create';
};

export const isEditFormMode = (mode: EntityFormMode): boolean => {
  return mode === 'edit';
};
