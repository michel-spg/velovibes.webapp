export const getImageUrl = (imageUrl) => {
  const backendUrl = "http://localhost:3000";
  if (!imageUrl) {
    return `${backendUrl}/images/placeholder.png`;
  }
  return `${backendUrl}${imageUrl}`;
};
