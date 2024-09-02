function Button({
  className = '',
  type = 'button',
  variant = 'normal',
  onClick = (e) => { },
  children,
  disabled = false,
  ...props
}) {

  if (variant === 'outline') {
    return (
      <button className={`btn btn-outline ${className}`} type={type} onClick={onClick} disabled={disabled} {...props} >
        {children}
      </button>
    )
  }

  return (
    <button className={`btn btn-normal ${className}`} type={type} onClick={onClick} disabled={disabled} {...props} >
      {children}
    </button>
  )
}

export default Button