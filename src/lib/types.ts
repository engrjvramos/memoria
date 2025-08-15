export type ApiResponse = {
  success: boolean;
  message: string;
};

export type TTag = {
  id: string;
  name: string;
};

export type TNoteCounts = {
  all: number;
  archived: number;
};

export type Mode = 'edit' | 'create';
