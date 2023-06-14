import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import { pushImgToStorage, putJSONandGetHash } from "../../utils/storage";

import LoadingModal from "../Modals/LoadingModal";
import { Button } from "@mantine/core";

export default function CollectionItemModal({
  setShowForm,
  setItems,
  setQuantity,
  setItemsObject,
}) {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(1);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  const cancelButtonRef = useRef(null);

  //handle image upload
  const handleImageChange = async (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    //error handling
    if (!image) return toast.error("Please upload an image");
    if (itemName.length === 0) return toast.error("Please enter a name");
    if (description.length === 0)
      return toast.error("Please enter a description");
    if (description.length > 200) return toast.error("description too long");
    if (itemName.length > 30) return toast.error("Name too long");
    if (qty < 1) return toast.error("Quantity must be greater than 0");
    if (price <= 0) return toast.error("Price must be greater than 0");
    //end of error handling

    if (image && itemName.length >= 1 && description.length >= 5 && price > 0) {
      try {
        setLoading(true);
        const imgHash = await pushImgToStorage(image);
        console.log("Image hash: ", imgHash);
        //object to be pushed to collection page state
        const itemObj = { itemName, description, imageUrl, qty, price };
        //pushing object to collection page state
        setItemsObject((prev) => [...prev, itemObj]);
        //object to be hashed on ipfs
        const item = { itemName, description, imgHash, price };

        const itemHash = await putJSONandGetHash(item);
        console.log("Item hash: ", itemHash);
        //passing item hash and qty to collection state
        setItems((prev) => [...prev, itemHash]);

        setQuantity((prev) => [...prev, qty]);
        //clearing form
        setItemName("");
        setDescription("");
        setImage(null);
        setImageUrl(null);
        setQty(0);
        setPrice(0);
        setLoading(false);
        setOpen(false);
        setShowForm(false);
        toast.success("Item added successfully");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Please try again");
      }
    } else {
      return;
    }
  };

  return (
    <>
      {loading && <LoadingModal />}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => {
            setOpen(false);
            setShowForm(false);
          }}
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
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
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
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-[80%] sm:w-full">
                  <div className="bg-ld px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
                    <div className="sm:flex sm:items-start w-full">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-300"
                        >
                          Please fill in the details of this item
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            This item will be added to this collection
                          </p>
                        </div>
                        <div className="mt-4 flex flex-col space-y-4 items-center justify-center w-full text-ld">
                          {/* Image Input and Preview Wrapper*/}
                          <div
                            className={
                              imageUrl
                                ? `w-[80%] flex items-center justify-between mx-auto`
                                : `flex`
                            }
                          >
                            {/* Image Input */}
                            <div className={imageUrl ? `pb-1` : `pb-1 mx-auto`}>
                              {/* Upload Image Icon */}
                              <div>
                                <label
                                  htmlFor="profile-image"
                                  className="flex flex-col items-center justify-center text-sm w-16 square aspect-square rounded-full bg-slate-200 dark:bg-slate-400 cursor-pointer"
                                >
                                  <FiUpload className="text-ld text-[20px]" />
                                  <span className="text-ld text-[10px] cursor-pointer">
                                    Upload
                                  </span>
                                </label>
                                <input
                                  type="file"
                                  id="profile-image"
                                  className="text-ld hidden"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </div>
                              {/* Label for upload */}
                              <div className="pt-2">
                                <label
                                  htmlFor=""
                                  className="text-ld text-sm -ml-8 font-medium"
                                >
                                  Set an Item Photo
                                </label>
                              </div>
                            </div>
                            {/* Preview */}
                            {imageUrl && (
                              <div className="flex flex-col gap-2">
                                <div className=" w-16 square aspect-square rounded-full border-[3px] border-indigo-600 overflow-hidden">
                                  <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="w-full h-full object-center object-cover"
                                  />
                                </div>
                                <p className="text-sm text-ld font-medium">
                                  Preview
                                </p>
                              </div>
                            )}
                          </div>
                          {/* Name */}
                          <div className="w-full flex flex-col items-start">
                            <label htmlFor="" className="text-xs">
                              <Required />
                              Item Name
                            </label>
                            <input
                              type="text"
                              className="w-full form-input"
                              value={itemName}
                              onChange={(e) => setItemName(e.target.value)}
                            />
                          </div>
                          {/* Description */}
                          <div className="w-full flex flex-col items-start">
                            <label htmlFor="" className="text-xs">
                              <Required />
                              Description
                            </label>
                            <input
                              type="text"
                              className="w-full form-input"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          {/* Quantity */}
                          <div className="w-full flex flex-col items-start">
                            <label htmlFor="" className="text-xs">
                              <Required />
                              Quantity
                            </label>
                            <input
                              type="number"
                              className="w-full form-input"
                              value={qty}
                              min="1"
                              onChange={(e) => setQty(e.target.value)}
                            />
                          </div>
                          {/* Price */}
                          <div className="w-full flex flex-col items-start">
                            <label htmlFor="" className="text-xs">
                              <Required />
                              Price(FIL)
                            </label>
                            <input
                              type="number"
                              className="w-full form-input"
                              value={price}
                              min="1"
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-ld px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse sm:items-center justify-center">
                    <Button
                      sx={{ fontFamily: "ultra" }}
                      className="tracking-wider"
                      variant="outline"
                      color="gray.9"
                      radius="lg"
                      size="lg"
                      onClick={handleClick}
                    >
                      Add Item
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

const Required = () => {
  return (
    <span className="font-bold text-indigo-700 dark:text-indigo-500">*</span>
  );
};
