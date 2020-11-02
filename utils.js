const scaleImage = (image, scale) => {
	image.resize(image.width * scale, image.height * scale);
	return image;
};
