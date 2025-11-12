document.addEventListener('DOMContentLoaded', () => {
    // 1. Get all necessary elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');
    
    // Define the duration of the CSS transition for consistency
    const transitionDuration = 400; // Match the 0.4s (400ms) transition in your CSS

    // 2. Loop through each filter button and attach a click event
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            const filterValue = button.getAttribute('data-filter');
            
            // Update active button state (CSS styling)
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 3. First Pass: Hide ALL items smoothly
            photoItems.forEach(item => {
                // This triggers the CSS opacity/transform transition (0.4s)
                item.classList.add('hidden'); 
            });
            
            // 4. Second Pass: Check and show filtered items after the hide transition completes
            setTimeout(() => {
                photoItems.forEach(item => {
                    
                    const isMatch = (filterValue === 'all' || item.classList.contains(filterValue));

                    if (isMatch) {
                        // Immediately remove 'hidden' class to make item visible/clickable
                        // The CSS transition will handle the opacity fade-in
                        item.classList.remove('hidden'); 
                    }
                    
                    // Note: For grid optimization, we use a CSS rule for the 'hidden' class 
                    // to set display: none/grid or use visibility: hidden, which is better
                    // than toggling item.style.display in JavaScript.
                });
            }, transitionDuration); // Wait for the hide transition to finish
        });
    });
});