interface BlueButtonProps {
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BlueButton = ({label, onClick}: BlueButtonProps) => {
  return (
    <div className="w-full">
        <button onClick={onClick} className="font-semibold w-full bg-blue-600 text-white p-2 rounded-md hover:opacity-80 select-none">{label}</button>
    </div>
  )
}

export default BlueButton