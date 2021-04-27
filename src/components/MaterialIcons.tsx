type Props = {
  icon: string
  className?: string
}

const MaterialIcons = ({ icon, className }: Props) => {
  return (
    <span
      className={`material-icons${
        className ? ` ${className}` : ``
      } select-none`}
    >
      {icon}
    </span>
  )
}

export default MaterialIcons
