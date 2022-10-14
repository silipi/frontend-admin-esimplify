/* eslint-disable react/no-array-index-key */
import { ForwardedRef, forwardRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FileInput } from '@mantine/core';
import { MdClose } from 'react-icons/md';
import { Container, Image, ImageContainer, ImagesContainer } from '../styles';

interface Props {
  name: string;
}

const EditImages = forwardRef(
  ({ name }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const { getValues, setValue } = useFormContext();
    const [imagesFromProduct, setImagesFromProduct] = useState<any[]>(
      getValues('images'),
    );
    const [newImages, setNewImages] = useState<File[]>([]);
    const [deletedImages, setDeletedImages] = useState<any[]>([]);

    const handleSelectImages = (file: File[]) => {
      // prevent adding the same image twice
      const filteredImages = file.filter(
        (image) => !newImages.find((img) => img.name === image.name),
      );

      setNewImages([...newImages, ...filteredImages]);
      setValue(name, {
        deletedImages,
        newImages: [...newImages, ...filteredImages],
      });
    };

    const handleRemoveExistingImage = (key: string) => {
      console.log(key);
      const imageToDelete = imagesFromProduct.find(
        (image) => image.key === key,
      );

      // if the image is already in deletedImages, remove it from there
      if (deletedImages.find((image) => image.key === key)) {
        const newDeletedImages = deletedImages.filter(
          (image) => image.key !== key,
        );
        setDeletedImages(newDeletedImages);
        setValue(name, { deletedImages: newDeletedImages, newImages });
      } else {
        // if the image is not in deletedImages, add it there
        setDeletedImages([...deletedImages, imageToDelete]);
        setValue(name, {
          deletedImages: [...deletedImages, imageToDelete],
          newImages,
        });
      }
    };

    const handleRemoveNewImage = (image) => {
      const filteredImages = newImages.filter((img) => img.name !== image.name);
      setNewImages(filteredImages);
    };

    return (
      <Container>
        <span>Imagens existentes:</span>
        <ImagesContainer>
          {imagesFromProduct.map((image: any, index: number) => (
            <ImageContainer
              key={index}
              onClick={() => handleRemoveExistingImage(image.key)}
            >
              <button type="button">
                <MdClose />
              </button>

              <Image
                src={image.location}
                isDeleted={deletedImages.find((img) => img.key === image.key)}
              />
            </ImageContainer>
          ))}
        </ImagesContainer>

        <span>Adicionar novas imagens:</span>
        {newImages.length > 0 && (
          <ImagesContainer>
            {newImages.map((image: any, index: number) => (
              <ImageContainer key={index}>
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(image)}
                >
                  <MdClose />
                </button>

                <Image src={URL.createObjectURL(image)} />
              </ImageContainer>
            ))}
          </ImagesContainer>
        )}

        <FileInput
          ref={ref}
          name={name}
          onChange={handleSelectImages}
          value={newImages}
          multiple
          accept="image/*"
          placeholder="Selecione as imagens"
        />
      </Container>
    );
  },
);

export default EditImages;
