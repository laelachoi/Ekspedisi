import { Button } from "./ui/button";

export const ProCard = () => {
  return (
    <div className="rounded-2xl overflow-clip mt-auto relative w-full aspect-square">
      <div className="relative z-10 flex flex-col items-center justify-end h-full p-4">
        <Button className="rounded-4xl bg-white text-black w-full">Upgrade to Pro</Button>
      </div>
      <img src="/images/vespa-tiger.jpg" alt="Pro Card" className="w-full h-auto absolute inset-0" />
    </div>
  );
};
