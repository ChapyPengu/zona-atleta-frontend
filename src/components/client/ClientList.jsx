import ClientCard from './ClientCard'

function ClientList({ clients }) {

  return (
    <div className='max-w-[1024px] mx-auto py-32 flex flex-col gap-8'>
      {
        clients.map((c, i) => <ClientCard key={i} client={c} />)
      }
    </div>
  )
}

export default ClientList