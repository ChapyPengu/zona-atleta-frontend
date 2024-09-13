function LayoutHome({ children }) {
  return (
    <div className='w-full max-w-[1536px] mx-auto py-32 px-16 flex flex-col gap-32'>
      {children}
    </div>
  )
}

export default LayoutHome