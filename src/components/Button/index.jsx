import style from './style.module.scss';

function Button({text}) {
  return (
    <div className={style.button}>{text}</div>
  )
}

export default Button