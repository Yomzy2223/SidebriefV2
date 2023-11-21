import { Button } from "@/components/flowbite";
import { Navbar } from "@/components/navbar";

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
    </div>
  );
}
