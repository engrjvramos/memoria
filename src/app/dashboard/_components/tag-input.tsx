import { Input } from '@/components/ui/input';
import { TTag } from '@/lib/types';
import { XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

type TagInputProps = {
  value: TTag[];
  onChange: (tags: TTag[]) => void;
  placeholder?: string;
};

export default function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 20) return;

    if (value.some((tag) => tag.name.toLowerCase() === trimmed.toLowerCase())) {
      toast.error('Duplicate tag names are not allowed');
      return;
    }

    if (value.length >= 10) {
      toast.error('You can only add up to 10 tags');
      return;
    }

    const newTag: TTag = { id: uuidv4(), name: trimmed };
    onChange([...value, newTag]);
    setInputValue('');
  };

  const removeTag = (id: string) => {
    onChange(value.filter((tag) => tag.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1].id);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded border p-2">
      <Input
        type="text"
        maxLength={20}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Press enter to add a tag...'}
        className="h-10 shrink-0 outline-none"
      />

      <div className="flex flex-wrap items-center gap-2">
        {value.map((tag) => (
          <div
            key={tag.id}
            className="bg-input/30 flex h-9 flex-wrap items-center justify-between gap-1 rounded-md border pr-1 pl-2 text-xs"
          >
            {tag.name}
            <button
              type="button"
              onClick={() => removeTag(tag.id)}
              className="flex size-4 cursor-pointer items-center justify-center"
            >
              <XIcon className="size-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
