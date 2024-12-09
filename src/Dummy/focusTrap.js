// focusTrap.js
let trapState = {
    isFocused: false,
    focusableElements: []
  };
  
  function setFocusableElements(elements) {
    trapState.focusableElements = elements;
  }
  
  function trapFocus() {
    if (trapState.focusableElements.length > 0) {
      trapState.isFocused = true;
      trapState.focusableElements[0].focus(); // Focus the first element in the modal
    }
  }
  
  function releaseFocus() {
    trapState.isFocused = false;
  }
  
  function handleKeydown(event) {
    if (trapState.isFocused) {
      const { focusableElements } = trapState;
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
  
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus(); // Move focus to the last element
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus(); // Move focus to the first element
        }
      }
    }
  }
  
  export {
    setFocusableElements,
    trapFocus,
    releaseFocus,
    handleKeydown
  };
  