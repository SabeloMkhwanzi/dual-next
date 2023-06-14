import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Orbit } from "@uiball/loaders";
import { useProvider, useSigner, useContract } from "wagmi";
import { COLLECTION_ABI } from "../../constants/index";
import toast from "react-hot-toast";

export default function MintAllModal({ collectionAddress }) {
  const provider = useProvider();
  const signer = useSigner();

  const [open, setOpen] = useState(true);

  const CollectionContract = useContract({
    addressOrName: collectionAddress,
    contractInterface: COLLECTION_ABI,
    signerOrProvider: signer.data || provider,
  });

  useEffect(() => {
    const mintAll = async () => {
      const tx = await CollectionContract.mintAll();
      await tx.wait();
      setOpen(false);
      toast.success("Collection Successfully created");
    };
    mintAll();
  }, [CollectionContract]);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-ld rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:py-8 sm:max-w-sm w-[80%] sm:w-full">
                <div className="bg-ld px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-[70%} sm:w-full">
                  <div className="sm:flex sm:items-start">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto rounded-full sm:mx-0 sm:h-10 sm:w-10">
                      <Orbit color="#6366F1" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 ultra"
                      >
                        Mint All
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 ultra">
                          Please wait while we mint all your NFTs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
