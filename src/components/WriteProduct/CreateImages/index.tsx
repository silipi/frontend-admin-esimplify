/* eslint-disable react/no-array-index-key */
import { ForwardedRef, forwardRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FileInput } from '@mantine/core';
import { MdClose } from 'react-icons/md';
import { Container, Image, ImageContainer, ImagesContainer } from '../styles';

interface Props {
  name: string;
}

const CreateImages = forwardRef(
  ({ name }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const { setValue } = useFormContext();
    const [fileImages, setFileImages] = useState<File[]>([]);

    const handleSelectImages = (file: File[]) => {
      // prevent adding the same image twice
      const filteredImages = file.filter(
        (image) => !fileImages.find((img) => img.name === image.name),
      );

      setFileImages([...fileImages, ...filteredImages]);
      setValue(name, [...fileImages, ...filteredImages]);
    };

    const handleRemoveImage = (index: number) => {
      const newImages = fileImages.filter((_, i) => i !== index);
      setFileImages(newImages);
      setValue(name, newImages);
    };

    return (
      <Container>
        {fileImages.length > 0 && (
          <ImagesContainer>
            {fileImages.map((image: any, index: number) => (
              <ImageContainer key={index}>
                <button type="button" onClick={() => handleRemoveImage(index)}>
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
          value={fileImages}
          multiple
          accept="image/*"
          placeholder="Selecione as imagens"
        />
      </Container>
    );
  },
);

export default CreateImages;
