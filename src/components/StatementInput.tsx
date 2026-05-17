interface StatementInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MAX_LENGTH = 120;

export function StatementInput({ value, onChange }: StatementInputProps) {
  return (
    <label className="block">
      <textarea
        maxLength={MAX_LENGTH}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[64px] w-full resize-none rounded-md border border-line bg-white px-5 py-[18px] text-2xl font-medium leading-none tracking-normal text-ink shadow-sm outline-none transition placeholder:text-stone-300 focus:border-[#B86128]"
        placeholder="Type a statement"
      />
      <span className="mt-2 block text-right text-[11px] text-muted">
        {value.length}/{MAX_LENGTH}
      </span>
    </label>
  );
}
