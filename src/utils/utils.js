// Universal function for submit handling
function handleSubmit(request, popupInstance, loadingText) {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

export { handleSubmit };
