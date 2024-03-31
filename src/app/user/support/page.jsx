"use client";
import React from "react";
import Image from "next/image";
import support from "../../images/service.png";
import { Ripple } from "primereact/ripple";
import { MdArrowBackIos } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const Support = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="md:max-w-[30rem] mx-auto select-none">
      {/* Header */}
      <div className="flex text-lg font-medium  md:max-w-[30rem] w-full mx-auto shadow-lg items-center bg-white fixed top-0 left-0 right-0 z-10">
        <div className="p-ripple w-10 p-4" onClick={() => router.back()}>
          <Ripple
            pt={{
              root: { style: { background: "rgba(9, 194, 126, 0.2)" } },
            }}
          />
          <MdArrowBackIos className="cursor-pointer" size={20} />
        </div>
        <h1 className="text-center flex-grow p-4">Support</h1>
      </div>

      <div className="h-[190vh]">
        {/* Other content */}
        <div>
          <div className=" text-black text-center mt-20">
            <div className="grid grid-cols-1 justify-items-center">
              <Image src={support} className="w-[8rem] pt-10" alt="" />
              <h2 className="text-sm">
                If you have any query or suggestion <br /> feel free to mail us:{" "}
                <span className="text-emerald-500 underline cursor-pointer">
                  connect@wyvate.com
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* FAQ'S */}
        <div className="mt-10 p-2">
          <div className="pb-5 pl-2">
            <h1 className="text-lg text-emerald-400">FAQ&apos;s</h1>
          </div>

          <Accordion
            open={open === 1}
            className="mb-2 rounded-lg border-2 border-blue-gray-100 px-4"
          >
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className={`border-b-0 text-base font-normal text-left transition-colors ${
                open === 1 ? "text-emerald-500 hover:!text-emerald-700" : ""
              }`}
            >
              Lorem ipsum dolor sit amet?{" "}
            </AccordionHeader>
            <AccordionBody className="pt-0 text-sm font-thin">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
              aspernatur magnam dignissimos ipsum dolorum ipsam repellendus,
              voluptatibus sapiente eius, corrupti est aut at minima. Vero
              exercitationem, quisquam iure aliquid ab illum consectetur quas
              dolor inventore minima illo quia saepe eius?.
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 2}
            className="mb-2 rounded-lg border-2 border-blue-gray-100 px-4"
          >
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className={`border-b-0 text-base font-normal  transition-colors ${
                open === 2 ? "text-emerald-500 hover:!text-emerald-700" : ""
              }`}
            >
              Lorem ipsum dolor sit amet?
            </AccordionHeader>
            <AccordionBody className="pt-0 text-sm font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              aliquid voluptatibus beatae vitae in quas nostrum? Aspernatur
              expedita quod esse repellat facilis voluptatibus vitae
              reprehenderit necessitatibus temporibus quis ab ipsa libero, nihil
              voluptatum delectus consectetur voluptates? Libero quo ducimus
              assumenda, error sunt maiores qui ipsam omnis repellat. Quo,
              provident iste.
            </AccordionBody>
          </Accordion>
          <Accordion
            open={open === 3}
            className="rounded-lg border-2 border-blue-gray-100 px-4"
          >
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className={`border-b-0 text-base font-normal transition-colors ${
                open === 3 ? "text-emerald-500 hover:!text-emerald-700" : ""
              }`}
            >
              Lorem ipsum dolor sit amet ?
            </AccordionHeader>
            <AccordionBody className="pt-0 text-sm font-normal">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
              ratione eius esse delectus sit tempore, tempora, excepturi
              veritatis minus autem cumque inventore eveniet quod provident
              ipsum similique doloribus dignissimos vero alias nostrum
              consequatur corporis! Quod perspiciatis minima laudantium totam
              accusamus.
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Support;
