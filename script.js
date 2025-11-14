document.addEventListener('DOMContentLoaded', () => {
    // 1. Get all necessary elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');
    
    // Define the duration of the CSS transition for consistency
    const transitionDuration = 400; // Match the 0.4s (400ms) transition in your CSS

    // Function to run the filter logic
    const runFilter = (filterValue) => {
        
        // 1. Update active button state (CSS styling)
        filterButtons.forEach(btn => btn.classList.remove('active'));
        const targetButton = document.querySelector(`.filter-menu button[data-filter="${filterValue}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }

        // 2. First Pass: Hide ALL items smoothly
        photoItems.forEach(item => {
            item.classList.add('hidden'); 
        });
        
        // 3. Second Pass: Check and show filtered items after the hide transition completes
        setTimeout(() => {
            photoItems.forEach(item => {
                
                // The filter now works directly with the class name (e.g., 'Wedding')
                // Note: The 'all' filter is removed, so we only check for class containment.
                const isMatch = (filterValue === 'all' || item.classList.contains(filterValue));

                if (isMatch) {
                    // Immediately remove 'hidden' class to make item visible/clickable
                    item.classList.remove('hidden'); 
                }
            });
        }, transitionDuration);
    };

    // -----------------------------------------------
    // 🌟 INITIAL LOAD: Trigger Wedding Filter 🌟
    // -----------------------------------------------
    const initialFilter = 'Wedding'; 
    
    // Run the 'Wedding' filter immediately on page load, setting the initial view
    // This executes the logic needed to hide non-wedding photos.
    runFilter(initialFilter);
    
    // 2. Loop through each filter button and attach a click event
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            runFilter(filterValue);
        });
    });
});