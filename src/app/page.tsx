import { Button } from "@/components/flowbite";
import { Navbar } from "@/components/navbar";
import { CountryCard } from "@/components/cards/countrycard";
import { AuthStepper } from "@/components/stepper/auth";

export default function Home() {
  return (
    <div>
      <Navbar />
      <p>Hello world</p>
      <Button color="primary">Click me</Button>
      <Button color="magenta">Click me</Button>
      <Button color="ghost">Click me</Button>
      <Button outline color="magenta">
        Click me
      </Button>
      <div className="flex flex-col gap-2 max-w-sm">
        <CountryCard name="Ghana" active={true} />
        <CountryCard name="Kenya" active={false} />
        <CountryCard name="United States" active={false} />
        <CountryCard name="Nigeria" active={false} />
        <CountryCard name="Canada" active={false} />
        <CountryCard name="Senegal" active={false} />
      </div>
      <AuthStepper progress={2} />
    </div>
  );
}
