import Xmark from '../components/icons/Xmark'

function Screen({ children, setScreen }) {

  return (
    <div className='screen'>
      <button className='screen__btn-close' title='Cerrar' onClick={() => setScreen(false)}>
        <Xmark />
      </button>
      {children}
    </div>
  )
}

export default Screen