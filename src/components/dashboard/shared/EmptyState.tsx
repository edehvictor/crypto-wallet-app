import { cn } from "@/lib/utils";

const EmptyState: React.FC<{
  image: string;
  title: string;
  description: string;
  className?: string;
}> = (props) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center py-14 bg- border rounded-xl",
        props.className
      )}
    >
      <img src={props.image} className="size-[12rem]" alt="" />
      <h1 className="font-semibold text-xl font-jakarta mt-3 text-gray-200">
        {props.title}
      </h1>
      <p className="font-jakarta text-gray-300 mt-1.5">{props.description}</p>
    </div>
  );
};

export default EmptyState;
