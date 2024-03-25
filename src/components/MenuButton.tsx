function MenuButton({
  className,
  onClick,
  value,
  text,
}: {
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value: string;
  text: string;
}) {
  return (
    <button onClick={onClick} type="button" value={value} className={className}>
      {text}
    </button>
  );
}

export default MenuButton;
