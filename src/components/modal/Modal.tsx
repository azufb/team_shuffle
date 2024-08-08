interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, title, content, children }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-50 z-10">
          <div className="bg-white w-80 h-48 p-4 rounded-md flex flex-col gap-4 justify-center absolute z-20 top-0 left-0 right-0 bottom-0 m-auto">
            <h1 className="font-bold text-xl text-center w-full">{title}</h1>
            <p className="w-full text-center">{content}</p>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
