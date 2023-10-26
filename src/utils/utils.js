// Universal function for submit handling
const handleSubmit = (request, popupInstance, loadingText = "Saving...") => {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
};

export { handleSubmit };
