import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface AccordionItemData {
  header: string;
  description: string;
}
const FAQ = ({ data }: {  data: AccordionItemData[] }) => {
  return (
    <Accordion type="single" collapsible className="w-full text-gray-900 bg-transparent" >
      {data.map((item) => (
        <AccordionItem key={item.header} value={item.header} className="bg-white mt-4 px-3">
            <AccordionTrigger  className="text-gray-900">{item.header}</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              <hr className="p-2"/>
              {item.description}
            </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
    
  )
}

export default FAQ