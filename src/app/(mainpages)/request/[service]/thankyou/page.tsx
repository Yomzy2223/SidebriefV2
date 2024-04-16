import CelebrateGif from "@/assets/gifs/background-celebrate.gif";
import CheckGif from "@/assets/gifs/check.gif";
import { Button } from "flowbite-react";
import Image from "next/image";
import { ArrowRight } from "@/assets/icons";

export default function CompleteRequest() {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-white z-50">
      {/* <div className="relative w-full h-[300px]"> */}
      <div>
        <Image src={CelebrateGif} alt={"celebrate"} className="w-full h-[310px]" />
      </div>
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="flex flex-col justify-between min-h-screen">
          <div className="mt-6 flex flex-col items-center mx-auto w-fit">
            <Image src={CheckGif} alt={"check"} className="w-[350px] h-[350px]" />
            <div className="flex flex-col gap-[38px]">
              <h2 className="font-bold text-[45px] text-[#4E5152]">Registration completed</h2>
              <p className="text-center">
                You will get your documents in 3-5 days <br />
                Thank you for using Sidebrief
              </p>
            </div>
          </div>

          <div>
            <Button color="secondary" size={"lg"} className="self-start mt-8">
              <div className="space-x-2 flex items-center">
                <p>Go back home</p>
                <ArrowRight />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
