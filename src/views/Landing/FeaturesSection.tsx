export function FeaturesSection() {
  return (
    <section className="grid grid-cols-2 bg-white">
      <h3 className="text-accent-800 text-5xl max-w-[500px] font-bold">
        The benefits of using DeployVault
      </h3>
      <div className="flex flex-col gap-11">
        <p className="text-accent-800 font-semibold">
          DeployVault aims to create a comprehensive system that streamlines
          software commercialization, bridging the gap between development and
          market entry for smaller enterprises.
        </p>
        <div className="flex gap-6">
          <div className="flex flex-col gap-3">
            <h4 className="text-accent">Feature one</h4>
            <p className="text-accent-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-accent">Feature one</h4>
            <p className="text-accent-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros.
            </p>
          </div>
        </div>
        <button className="accent-button w-fit font-semibold px-4 py-3">
          Button?
        </button>
      </div>
    </section>
  );
}
