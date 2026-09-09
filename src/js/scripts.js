const openModalBtn = document.getElementById("openModal");
        const modal = document.getElementById("modal");
        const overlay = document.getElementById("modalOverlay");
        const saveBtn = document.getElementById("saveSettings");
        const darkModeCheckbox = document.getElementById("darkMode");
        const easyLanguageCheckbox = document.getElementById("easyLanguage");
        const largeTextCheckbox = document.getElementById("largeText");

        function toggleModal(show) {
            if (show) {
                modal.classList.remove("hidden");
                overlay.classList.remove("hidden");
                document.body.classList.add("modal-open");
            } else {
                modal.classList.add("hidden");
                overlay.classList.add("hidden");
                document.body.classList.remove("modal-open");
            }
        }

        function updateBodyClass(checkbox, className) {
            if (checkbox.checked) {
                document.body.classList.add(className);
            } else {
                document.body.classList.remove(className);
            }
        }

        openModalBtn.addEventListener("click", () => toggleModal(true));
        overlay.addEventListener("click", () => toggleModal(false));

        darkModeCheckbox.addEventListener("change", () => updateBodyClass(darkModeCheckbox, "dark-mode"));
        easyLanguageCheckbox.addEventListener("change", () => updateBodyClass(easyLanguageCheckbox, "easy-language"));
        largeTextCheckbox.addEventListener("change", () => updateBodyClass(largeTextCheckbox, "large-text"));

        saveBtn.addEventListener("click", () => toggleModal(false));


// Funktion, um das Akkordeon zu steuern
function setupAccordion() {
    const panels = document.querySelectorAll('.panel');
  
    panels.forEach((panel) => {
      const trigger = panel.querySelector('.panel-trigger');
      const content = panel.querySelector('.panel-content');
  
      // CSS-Übergangseffekt hinzufügen
      content.style.transition = 'max-height 0.2s ease-out';
      content.style.maxHeight = '0px';
  
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
  
        // Alle Panels schließen
        panels.forEach((otherPanel) => {
          if (otherPanel !== panel) {
            const otherTrigger = otherPanel.querySelector('.panel-trigger');
            const otherContent = otherPanel.querySelector('.panel-content');
            otherContent.style.maxHeight = '0px';
            otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });
  
        if (expanded) {
          // Das aktuelle Panel schließen
          content.style.maxHeight = '0px';
        } else {
          // Das aktuelle Panel öffnen
          content.style.maxHeight = content.scrollHeight + 'px';
        }
  
        // Trigger-Zustand aktualisieren
        trigger.setAttribute('aria-expanded', !expanded);
      });
    });
  }
  
  // Das Akkordeon-Setup ausführen, wenn das DOM geladen ist
  document.addEventListener('DOMContentLoaded', () => {
    setupAccordion();
  });
