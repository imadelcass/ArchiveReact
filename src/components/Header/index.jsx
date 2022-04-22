const Header = ({title}) => {
  return (
    <div className="w-full h-20 flex justify-center items-center border-b-2">
        <h1 className="text-2xl">{title}</h1>
    </div>
  )
}

export default Header