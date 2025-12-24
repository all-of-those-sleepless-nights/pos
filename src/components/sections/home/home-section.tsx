import CreateOrderCTA from "./cta/create-order-cta"

type HomeSectionProps = {
  onCreateOrder: () => void
  isActive: boolean
}

function HomeSection({ onCreateOrder, isActive }: HomeSectionProps) {
  return (
    <section
      className={`${
        isActive ? "flex" : "hidden"
      } h-full flex-1 flex-col bg-white px-10 py-12`}
    >
      <div className="flex flex-1 items-center justify-center">
        <CreateOrderCTA onCreate={onCreateOrder} />
      </div>
    </section>
  )
}

export default HomeSection
