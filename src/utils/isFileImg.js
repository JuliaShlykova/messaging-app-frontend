const isFileImage = (file) => {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    return file&&acceptedImageTypes.includes(file.type);
};

export default isFileImage;