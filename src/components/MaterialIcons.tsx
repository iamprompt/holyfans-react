type Props = {
  icon: string
  className?: string
  onClick?: () => void
}

const MaterialIcons = ({ icon, className, onClick }: Props) => {
  return (
    <span
      className={`material-icons${
        className ? ` ${className}` : ``
      } select-none`}
      onClick={onClick}
    >
      {icon}
    </span>
  )
}

export default MaterialIcons
