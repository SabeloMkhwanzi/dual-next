import { useState } from "react";
import Link from "next/link";
import { IconFileUpload } from "@tabler/icons-react";
import toast from "react-hot-toast";
import LoadingModal from "../Modals/LoadingModal";
import { pushImgToStorage, putJSONandGetHash } from "../../utils/storage";
import { useProvider, useSigner, useContract } from "wagmi";
import { ARTIST_CONTRACT_ADDRESS, ARTIST_ABI } from "../../constants/index";
import { Button, Image, Input, Text, Textarea, Title } from "@mantine/core";

function NewGamerSignUp() {
  const provider = useProvider();
  const signer = useSigner();
  // Set up a contract instance
  const ArtistContract = useContract({
    addressOrName: ARTIST_CONTRACT_ADDRESS,
    contractInterface: ARTIST_ABI,
    signerOrProvider: signer.data || provider,
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  //handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //error handling
    if (!image) return toast.error("Please upload an image");
    if (!name) return toast.error("Please enter a name");
    if (!bio) return toast.error("Please enter a bio");
    if (bio.length > 400) return toast.error("Bio too long");
    if (name.length > 30) return toast.error("Name too long");

    if (image && name.length >= 1 && bio.length >= 5) {
      setLoading(true);
      console.log("uploading image");
      const imgHash = await pushImgToStorage(image);
      console.log("Image hash: ", imgHash);

      //create artist object
      const artist = {
        name,
        bio,
        imgHash,
      };
      const artistHash = await putJSONandGetHash(artist);
      console.log("Artist hash: ", artistHash);
      //push hash to contract
      const txResponse = await ArtistContract.newArtistSignup(artistHash);
      await txResponse.wait();

      setName("");
      setBio("");
      setImage(null);
      setImageUrl(null);
      setLoading(false);
      toast.success("Signup successful");
    } else {
      setLoading(false);
      toast.error("Please try again");
    }
  };

  return (
    <>
      {loading ? <LoadingModal /> : null}
      <div className="min-h-screen px-4 pt-6 sm:px-6 lg:px-6">
        <div className="w-full max-w-md mx-auto space-y-4">
          {/* Title and Logo */}
          <div>
            <Title size="h1" className="ultra" weight={500} align="center">
              Sign up as an Gamer
            </Title>
            <Text mt={2} size="sm" align="center" className="ultra">
              Already Signed?{" "}
              <Link href="/collection/create">
                <span className="text-blue cursor-pointer ultra underline">
                  Create a collection
                </span>
              </Link>
            </Text>
          </div>

          {/* Form */}
          <form className="form-css" onSubmit={handleSubmit}>
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
                    className="flex flex-col items-center justify-center w-16 text-sm rounded-full cursor-pointer square aspect-square bg-slate-200 dark:bg-slate-400"
                  >
                    <IconFileUpload className="text-ld text-[20px]" />
                    <span className="text-ld  text-[10px] cursor-pointer">
                      Upload
                    </span>
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden text-ld"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                {/* Label for upload */}
                <div className="pt-2">
                  <Text ml="-2rem" size="sm" fw="md" className="ultra">
                    Set a Profile photo
                  </Text>
                </div>
              </div>
              {/* Preview */}
              {imageUrl && (
                <div className="flex flex-col gap-2">
                  <div className=" w-16 square aspect-square rounded-full border-[3px] border-indigo-600 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                  <Text align="centre" size="sm" fw="md" className="ultra">
                    Preview
                  </Text>
                </div>
              )}
            </div>
            {/* Name Input */}

            <Input
              type="text"
              id="name"
              required
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Bio Input */}

            <Textarea
              name="bio"
              id="bio"
              placeholder="Tell your fans about yourself"
              cols="30"
              rows="2"
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></Textarea>

            <Text
              align="centre"
              mt="-4"
              size="sm"
              fw="md"
              color="blue.9"
              className="ultra"
            >
              Max 100 words
            </Text>
            {/* Signup button */}
            <Button
              sx={{ fontFamily: "ultra" }}
              className="tracking-wider"
              variant="default"
              radius="lg"
              size="xl"
              type="submit"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewGamerSignUp;
