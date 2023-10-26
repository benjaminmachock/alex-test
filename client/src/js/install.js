const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => { 
    console.log('beforeinstallprompt fired');
  
    event.preventDefault();

    window.deferredPrompt = event;

    butInstall.style.display= 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
  
    if (!promptEvent) {
      return;
    }
  
    try {
      // Show the browser's install prompt
      await promptEvent.prompt();
  
      // Wait for the user to make a choice
      const choiceResult = await promptEvent.userChoice;
  
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the PWA installation');
      } else {
        console.log('User declined the PWA installation');
      }
    } catch (error) {
      console.error('Error while installing the PWA:', error);
    } finally {
      // Reset the deferredPrompt
      window.deferredPrompt = null;
  
      // Hide the install button
      butInstall.style.display = 'none';
    }
  });
  
  // Handle the PWA installation completion
  window.addEventListener('appinstalled', (event) => {
    console.log('PWA installed successfully');
    window.deferredPrompt = null;
    butInstall.style.display = 'none';
  });