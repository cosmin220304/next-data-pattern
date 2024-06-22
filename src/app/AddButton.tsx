"use client";

type Props = {
  handleAdd: () => Promise<void>;
};

export const AddButton = ({ handleAdd }: Props) => {
  return (
    <div className="pt-4">
      <form action={handleAdd}>
        <button type="submit">add</button>
      </form>
    </div>
  );
};
