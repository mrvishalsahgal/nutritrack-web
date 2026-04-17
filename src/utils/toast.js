export const toast = (message, type = 'success') => {
  const event = new CustomEvent('nt-toast', {
    detail: { message, type }
  });
  window.dispatchEvent(event);
};
